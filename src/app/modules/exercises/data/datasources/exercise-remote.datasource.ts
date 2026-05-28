import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MuscleGroup } from '../../domain/entities/exercise.entity';
import { environment } from '@env/environment';

export interface ExerciseDto {
  id: string;
  name: string;
  muscleGroup: MuscleGroup;
  sets: number;
  reps: number;
}

@Injectable()
export class ExerciseRemoteDataSource {
  private readonly baseUrl = `${environment.apiUrl}/exercises`;

  constructor(private readonly http: HttpClient) {}

  findAll(): Observable<ExerciseDto[]> {
    return this.http.get<ExerciseDto[]>(this.baseUrl);
  }

  findById(id: string): Observable<ExerciseDto> {
    return this.http.get<ExerciseDto>(`${this.baseUrl}/${id}`);
  }
}
