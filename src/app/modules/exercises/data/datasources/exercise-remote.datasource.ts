import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ExerciseFormData, MuscleGroup } from '../../domain/entities/exercise.entity';
import { environment } from '@env/environment';

export interface ExerciseDto {
  id: string;
  name: string;
  description: string;
  muscleGroup: MuscleGroup;
  sets: number;
  reps: number;
  status: number;
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

  create(payload: ExerciseFormData): Observable<{ message: string; exerciseId: number }> {
    return this.http.post<{ message: string; exerciseId: number }>(this.baseUrl, payload);
  }

  update(id: string, payload: Partial<ExerciseFormData>): Observable<{ message: string }> {
    return this.http.put<{ message: string }>(`${this.baseUrl}/${id}`, payload);
  }

  delete(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.baseUrl}/${id}`);
  }
}
