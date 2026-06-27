import { Injectable } from '@angular/core';
import { Observable, map, mapTo } from 'rxjs';
import { ExerciseRepository } from '../../domain/repositories/exercise.repository';
import { Exercise, ExerciseFormData } from '../../domain/entities/exercise.entity';
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

  override create(exercise: ExerciseFormData): Observable<void> {
    return this.remote.create(exercise).pipe(mapTo(void 0));
  }

  override update(id: string, exercise: Partial<ExerciseFormData>): Observable<void> {
    return this.remote.update(id, exercise).pipe(mapTo(void 0));
  }

  override delete(id: string): Observable<void> {
    return this.remote.delete(id).pipe(mapTo(void 0));
  }

  private toDomain(dto: ExerciseDto): Exercise {
    return new Exercise(String(dto.id), dto.name, dto.muscleGroup, dto.sets, dto.reps, dto.description, dto.categoryId ?? 0);
  }
}
