import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ExerciseRepository } from '../repositories/exercise.repository';
import { Exercise } from '../entities/exercise.entity';

@Injectable()
export class GetAllExercisesUseCase {
  constructor(private readonly exerciseRepository: ExerciseRepository) {}

  execute(): Observable<Exercise[]> {
    return this.exerciseRepository.findAll();
  }
}
