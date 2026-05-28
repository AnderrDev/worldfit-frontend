import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { ExerciseRepository } from '../../domain/repositories/exercise.repository';
import { Exercise, MuscleGroup } from '../../domain/entities/exercise.entity';
import { environment } from '@env/environment';

interface ExerciseDto {
  id: string;
  name: string;
  muscleGroup: MuscleGroup;
  sets: number;
  reps: number;
}

@Injectable()
export class ExerciseHttpRepository extends ExerciseRepository {
  private readonly baseUrl = `${environment.apiUrl}/exercises`;

  constructor(private readonly http: HttpClient) {
    super();
  }

  override findAll(): Observable<Exercise[]> {
    return this.http
      .get<ExerciseDto[]>(this.baseUrl)
      .pipe(map((list) => list.map(this.toDomain)));
  }

  override findById(id: string): Observable<Exercise> {
    return this.http
      .get<ExerciseDto>(`${this.baseUrl}/${id}`)
      .pipe(map(this.toDomain));
  }

  private toDomain(dto: ExerciseDto): Exercise {
    return new Exercise(dto.id, dto.name, dto.muscleGroup, dto.sets, dto.reps);
  }
}
