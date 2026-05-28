import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ExerciseRepository } from '../../domain/repositories/exercise.repository';
import { Exercise } from '../../domain/entities/exercise.entity';
import { ExerciseRemoteDataSource, ExerciseDto } from '../datasources/exercise-remote.datasource';

@Injectable()
export class ExerciseRepositoryImpl extends ExerciseRepository {
  constructor(private readonly remote: ExerciseRemoteDataSource) {
    super();
  }

  override findAll(): Observable<Exercise[]> {
    return this.remote.findAll().pipe(map((list) => list.map((dto) => this.toDomain(dto))));
  }

  override findById(id: string): Observable<Exercise> {
    return this.remote.findById(id).pipe(map((dto) => this.toDomain(dto)));
  }

  private toDomain(dto: ExerciseDto): Exercise {
    return new Exercise(dto.id, dto.name, dto.muscleGroup, dto.sets, dto.reps);
  }
}
