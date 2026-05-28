import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { GetAllExercisesUseCase } from '../../../domain/usecases/get-all-exercises.usecase';
import { Exercise, MuscleGroup } from '../../../domain/entities/exercise.entity';

@Component({
  selector: 'wf-exercise-list',
  templateUrl: './exercise-list.page.html',
  styleUrls: ['./exercise-list.page.scss']
})
export class ExerciseListPageComponent implements OnInit {
  exercises$!: Observable<Exercise[]>;

  readonly muscleLabels: Record<MuscleGroup, string> = {
    chest: 'Pecho',
    back: 'Espalda',
    legs: 'Piernas',
    shoulders: 'Hombros',
    arms: 'Brazos',
    core: 'Core',
    fullbody: 'Cuerpo completo'
  };

  constructor(private readonly getAllExercises: GetAllExercisesUseCase) {}

  ngOnInit(): void {
    this.exercises$ = this.getAllExercises.execute();
  }
}
