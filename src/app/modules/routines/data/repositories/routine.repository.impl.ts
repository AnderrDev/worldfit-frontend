import { Injectable } from '@angular/core';
import { Observable, map, mapTo } from 'rxjs';
import { RoutineRepository } from '../../domain/repositories/routine.repository';
import { Routine, RoutineFormData } from '../../domain/entities/routine.entity';
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

  override create(routine: RoutineFormData): Observable<void> {
    return this.remote.create(routine).pipe(mapTo(void 0));
  }

  override update(id: string, routine: Partial<RoutineFormData>): Observable<void> {
    return this.remote.update(id, routine).pipe(mapTo(void 0));
  }

  override delete(id: string): Observable<void> {
    return this.remote.delete(id).pipe(mapTo(void 0));
  }

  private toDomain(dto: RoutineDto): Routine {
    return new Routine(
      String(dto.id),
      dto.name,
      dto.description,
      dto.difficulty,
      (dto.exercises ?? []).map((e) => String(e.exerciseId)),
      dto.durationMinutes ?? 0,
      dto.assignedUserId,
      dto.assignmentStatus
    );
  }
}
