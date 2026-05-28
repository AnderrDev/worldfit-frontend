import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { RoutineRepository } from '../../domain/repositories/routine.repository';
import { Routine } from '../../domain/entities/routine.entity';
import { RoutineRemoteDataSource, RoutineDto } from '../datasources/routine-remote.datasource';

@Injectable()
export class RoutineRepositoryImpl extends RoutineRepository {
  constructor(private readonly remote: RoutineRemoteDataSource) {
    super();
  }

  override findAll(): Observable<Routine[]> {
    return this.remote.findAll().pipe(map((list) => list.map((dto) => this.toDomain(dto))));
  }

  override findById(id: string): Observable<Routine> {
    return this.remote.findById(id).pipe(map((dto) => this.toDomain(dto)));
  }

  override create(routine: Omit<Routine, 'id' | 'totalExercises'>): Observable<Routine> {
    return this.remote.create(routine).pipe(map((dto) => this.toDomain(dto)));
  }

  override update(id: string, routine: Partial<Routine>): Observable<Routine> {
    return this.remote.update(id, routine).pipe(map((dto) => this.toDomain(dto)));
  }

  override delete(id: string): Observable<void> {
    return this.remote.delete(id);
  }

  private toDomain(dto: RoutineDto): Routine {
    return new Routine(dto.id, dto.name, dto.description, dto.difficulty, dto.exerciseIds);
  }
}
