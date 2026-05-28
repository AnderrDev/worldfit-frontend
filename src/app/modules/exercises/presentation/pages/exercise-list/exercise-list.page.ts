import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { GetAllExercisesUseCase } from '../../../application/use-cases/get-all-exercises.use-case';
import { Exercise } from '../../../domain/entities/exercise.entity';

@Component({
  selector: 'wf-exercise-list',
  templateUrl: './exercise-list.page.html',
  styleUrls: ['./exercise-list.page.scss']
})
export class ExerciseListPageComponent implements OnInit {
  exercises$!: Observable<Exercise[]>;

  constructor(private readonly getAllExercises: GetAllExercisesUseCase) {}

  ngOnInit(): void {
    this.exercises$ = this.getAllExercises.execute();
  }
}
