import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { RoutineRepository } from '../../domain/repositories/routine.repository';
import { Routine } from '../../domain/entities/routine.entity';
import { environment } from '@env/environment';

interface RoutineDto {
  id: string;
  name: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  exerciseIds: string[];
}

@Injectable()
export class RoutineHttpRepository extends RoutineRepository {
  private readonly baseUrl = `${environment.apiUrl}/routines`;

  constructor(private readonly http: HttpClient) {
    super();
  }

  override findAll(): Observable<Routine[]> {
    return this.http
      .get<RoutineDto[]>(this.baseUrl)
      .pipe(map((list) => list.map(this.toDomain)));
  }

  override findById(id: string): Observable<Routine> {
    return this.http
      .get<RoutineDto>(`${this.baseUrl}/${id}`)
      .pipe(map(this.toDomain));
  }

  override create(routine: Omit<Routine, 'id' | 'totalExercises'>): Observable<Routine> {
    return this.http
      .post<RoutineDto>(this.baseUrl, routine)
      .pipe(map(this.toDomain));
  }

  override update(id: string, routine: Partial<Routine>): Observable<Routine> {
    return this.http
      .patch<RoutineDto>(`${this.baseUrl}/${id}`, routine)
      .pipe(map(this.toDomain));
  }

  override delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  private toDomain(dto: RoutineDto): Routine {
    return new Routine(dto.id, dto.name, dto.description, dto.difficulty, dto.exerciseIds);
  }
}
