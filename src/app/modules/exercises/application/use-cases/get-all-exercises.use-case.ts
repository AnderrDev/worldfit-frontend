import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ExerciseRepository } from '../../domain/repositories/exercise.repository';
import { Exercise } from '../../domain/entities/exercise.entity';

@Injectable({ providedIn: 'root' })
export class GetAllExercisesUseCase {
  constructor(private readonly exerciseRepository: ExerciseRepository) {}

  execute(): Observable<Exercise[]> {
    return this.exerciseRepository.findAll();
  }
}
