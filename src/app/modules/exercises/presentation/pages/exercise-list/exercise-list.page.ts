import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GetAllExercisesUseCase } from '../../../domain/usecases/get-all-exercises.usecase';
import { Exercise, ExerciseFormData, MuscleGroup } from '../../../domain/entities/exercise.entity';
import { ExerciseRepository } from '../../../domain/repositories/exercise.repository';
import { SessionService } from '@core/services/session.service';

@Component({
  selector: 'wf-exercise-list',
  templateUrl: './exercise-list.page.html',
  styleUrls: ['./exercise-list.page.scss']
})
export class ExerciseListPageComponent implements OnInit {
  exercises: Exercise[] = [];
  form: FormGroup;
  editing: Exercise | null = null;
  loading = false;
  saving = false;
  message = '';
  errorMessage = '';

  readonly muscleLabels: Record<MuscleGroup, string> = {
    chest: 'Pecho',
    back: 'Espalda',
    legs: 'Piernas',
    shoulders: 'Hombros',
    arms: 'Brazos',
    core: 'Core',
    fullbody: 'Cuerpo completo'
  };

  readonly muscleOptions: Array<{ value: MuscleGroup; label: string }> = [
    { value: 'chest', label: 'Pecho' },
    { value: 'back', label: 'Espalda' },
    { value: 'legs', label: 'Piernas' },
    { value: 'shoulders', label: 'Hombros' },
    { value: 'arms', label: 'Brazos' },
    { value: 'core', label: 'Core' },
    { value: 'fullbody', label: 'Cuerpo completo' }
  ];

  constructor(
    private readonly fb: FormBuilder,
    public readonly session: SessionService,
    private readonly getAllExercises: GetAllExercisesUseCase,
    private readonly exerciseRepository: ExerciseRepository
  ) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: [''],
      muscleGroup: ['chest', Validators.required],
      sets: [3, [Validators.required, Validators.min(1)]],
      reps: [10, [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit(): void {
    this.loadExercises();
  }

  loadExercises(): void {
    this.loading = true;
    this.errorMessage = '';
    this.getAllExercises.execute().subscribe({
      next: (exercises) => {
        this.exercises = exercises;
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = this.readError(err, 'No se pudieron cargar los ejercicios');
        this.loading = false;
      }
    });
  }

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload: ExerciseFormData = {
      name: this.form.value.name,
      description: this.form.value.description ?? '',
      muscleGroup: this.form.value.muscleGroup,
      sets: Number(this.form.value.sets),
      reps: Number(this.form.value.reps),
      status: 1
    };

    this.saving = true;
    this.message = '';
    this.errorMessage = '';

    const request = this.editing
      ? this.exerciseRepository.update(this.editing.id, payload)
      : this.exerciseRepository.create(payload);

    request.subscribe({
      next: () => {
        this.message = this.editing ? 'Ejercicio actualizado correctamente.' : 'Ejercicio creado correctamente.';
        this.saving = false;
        this.cancelEdit();
        this.loadExercises();
      },
      error: (err) => {
        this.errorMessage = this.readError(err, 'No se pudo guardar el ejercicio');
        this.saving = false;
      }
    });
  }

  edit(exercise: Exercise): void {
    this.editing = exercise;
    this.message = '';
    this.errorMessage = '';
    this.form.patchValue({
      name: exercise.name,
      description: exercise.description,
      muscleGroup: exercise.muscleGroup,
      sets: exercise.sets,
      reps: exercise.reps
    });
  }

  cancelEdit(): void {
    this.editing = null;
    this.form.reset({
      name: '',
      description: '',
      muscleGroup: 'chest',
      sets: 3,
      reps: 10
    });
  }

  delete(exercise: Exercise): void {
    const confirmed = window.confirm(`Dar de baja el ejercicio "${exercise.name}"?`);
    if (!confirmed) return;

    this.message = '';
    this.errorMessage = '';
    this.exerciseRepository.delete(exercise.id).subscribe({
      next: () => {
        this.message = 'Ejercicio dado de baja correctamente.';
        this.loadExercises();
      },
      error: (err) => (this.errorMessage = this.readError(err, 'No se pudo eliminar el ejercicio'))
    });
  }

  private readError(err: any, fallback: string): string {
    if (err?.status === 403) {
      return 'Tu usuario no tiene permisos de administrador para esta accion.';
    }
    return err?.error?.message ?? err?.message ?? fallback;
  }
}
