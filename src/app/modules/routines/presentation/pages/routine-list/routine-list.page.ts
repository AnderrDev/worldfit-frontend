import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GetAllRoutinesUseCase } from '../../../domain/usecases/get-all-routines.usecase';
import { Routine, RoutineFormData } from '../../../domain/entities/routine.entity';
import { RoutineRepository } from '../../../domain/repositories/routine.repository';
import { environment } from '@env/environment';
import { SessionService } from '@core/services/session.service';

type ExerciseLookup = {
  id: string;
  name: string;
  description: string;
  sets: number;
  reps: number;
  muscleGroup: string;
};

type UserLookup = {
  id: number;
  name: string;
  email: string;
  role?: string;
};

@Component({
  selector: 'wf-routine-list',
  templateUrl: './routine-list.page.html',
  styleUrls: ['./routine-list.page.scss']
})
export class RoutineListPageComponent implements OnInit {
  routines: Routine[] = [];
  users: UserLookup[] = [];
  form: FormGroup;
  editing: Routine | null = null;
  loading = false;
  saving = false;
  message = '';
  errorMessage = '';
  selectedRoutine: Routine | null = null;
  exercisesById: Record<string, ExerciseLookup> = {};
  availableExercises: ExerciseLookup[] = [];

  readonly difficultyLabels: Record<Routine['difficulty'], string> = {
    beginner: 'Principiante',
    intermediate: 'Intermedio',
    advanced: 'Avanzado'
  };

  readonly statusLabels: Record<Routine['assignmentStatus'], string> = {
    pending: 'Pendiente',
    accepted: 'Aceptada',
    rejected: 'Rechazada'
  };

  constructor(
    private readonly fb: FormBuilder,
    private readonly http: HttpClient,
    public readonly session: SessionService,
    private readonly getAllRoutines: GetAllRoutinesUseCase,
    private readonly routineRepository: RoutineRepository
  ) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', Validators.required],
      difficulty: ['beginner', Validators.required],
      assignedUserId: [null, [Validators.required, Validators.min(1)]],
      exerciseIds: [[]]
    });
  }

  ngOnInit(): void {
    this.loadRoutines();
    this.loadExercises();
    this.loadUsers();
  }

  loadRoutines(): void {
    this.loading = true;
    this.errorMessage = '';
    this.getAllRoutines.execute().subscribe({
      next: (routines) => {
        this.routines = routines;
        if (!this.selectedRoutine && routines.length > 0) {
          this.selectedRoutine = routines[0];
        }
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = this.readError(err, 'No se pudieron cargar las rutinas');
        this.loading = false;
      }
    });
  }

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const selectedIds: number[] = this.form.value.exerciseIds ?? [];
    const payload: RoutineFormData = {
      name: this.form.value.name,
      description: this.form.value.description ?? '',
      difficulty: this.form.value.difficulty,
      assignedUserId: Number(this.form.value.assignedUserId),
      exercises: selectedIds.map((exerciseId, idx) => ({
        exerciseId,
        sets: this.exercisesById[String(exerciseId)]?.sets ?? 3,
        repetitions: this.exercisesById[String(exerciseId)]?.reps ?? 10,
        exerciseOrder: idx + 1,
        notes: ''
      }))
    };

    this.saving = true;
    this.message = '';
    this.errorMessage = '';

    const request = this.editing
      ? this.routineRepository.update(this.editing.id, payload)
      : this.routineRepository.create(payload);

    request.subscribe({
      next: () => {
        this.message = this.editing ? 'Rutina actualizada correctamente.' : 'Rutina creada correctamente.';
        this.saving = false;
        this.cancelEdit();
        this.loadRoutines();
      },
      error: (err) => {
        this.errorMessage = this.readError(err, 'No se pudo guardar la rutina');
        this.saving = false;
      }
    });
  }

  edit(routine: Routine): void {
    this.editing = routine;
    this.message = '';
    this.errorMessage = '';
    this.form.patchValue({
      name: routine.name,
      description: routine.description,
      difficulty: routine.difficulty,
      assignedUserId: routine.assignedUserId || 1,
      exerciseIds: routine.exerciseIds.map((id) => Number(id))
    });
  }

  selectRoutine(routine: Routine): void {
    this.selectedRoutine = routine;
  }

  approximateDuration(routine: Routine): number {
    if (routine.durationMinutes > 0) return routine.durationMinutes;
    const baseByLevel = { beginner: 8, intermediate: 10, advanced: 12 };
    return Math.max(15, routine.totalExercises * baseByLevel[routine.difficulty]);
  }

  getExercise(id: string): ExerciseLookup | null {
    return this.exercisesById[id] ?? null;
  }

  cancelEdit(): void {
    this.editing = null;
    this.form.reset({
      name: '',
      description: '',
      difficulty: 'beginner',
      assignedUserId: null,
      exerciseIds: []
    });
  }

  isExerciseSelected(id: string): boolean {
    const selected: number[] = this.form.value.exerciseIds ?? [];
    return selected.includes(Number(id));
  }

  toggleExercise(id: string, checked: boolean): void {
    const exerciseId = Number(id);
    const current: number[] = this.form.value.exerciseIds ?? [];
    const next = checked
      ? Array.from(new Set([...current, exerciseId]))
      : current.filter((item) => item !== exerciseId);

    this.form.patchValue({ exerciseIds: next });
  }

  delete(routine: Routine): void {
    const confirmed = window.confirm(`Dar de baja la rutina "${routine.name}"?`);
    if (!confirmed) return;

    this.message = '';
    this.errorMessage = '';
    this.routineRepository.delete(routine.id).subscribe({
      next: () => {
        this.message = 'Rutina dada de baja correctamente.';
        this.loadRoutines();
      },
      error: (err) => (this.errorMessage = this.readError(err, 'No se pudo eliminar la rutina'))
    });
  }

  private loadExercises(): void {
    this.http.get<ExerciseLookup[]>(`${environment.apiUrl}/exercises`).subscribe({
      next: (exercises) => {
        this.availableExercises = exercises.map((exercise) => ({ ...exercise, id: String(exercise.id) }));
        this.exercisesById = this.availableExercises.reduce<Record<string, ExerciseLookup>>((acc, exercise) => {
          acc[exercise.id] = exercise;
          return acc;
        }, {});
      },
      error: () => {
        this.availableExercises = [];
        this.exercisesById = {};
      }
    });
  }

  private loadUsers(): void {
    this.http.get<UserLookup[]>(`${environment.apiUrl}/users`).subscribe({
      next: (users) => {
        this.users = users;
      },
      error: () => {
        this.users = [];
      }
    });
  }

  private readError(err: any, fallback: string): string {
    if (err?.status === 403) {
      return 'Tu usuario no tiene permisos de administrador para esta accion.';
    }
    return err?.error?.message ?? err?.message ?? fallback;
  }
}
