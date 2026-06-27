import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { RoutineFormData } from '../../domain/entities/routine.entity';

export interface RoutineDto {
  id: string;
  name: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  exerciseIds: string[];
  assignedUserId: number;
  assignmentStatus: 'pending' | 'accepted' | 'rejected';
  status: number;
}

@Injectable()
export class RoutineRemoteDataSource {
  private readonly baseUrl = `${environment.apiUrl}/routines`;

  constructor(private readonly http: HttpClient) {}

  findAll(): Observable<RoutineDto[]> {
    return this.http.get<RoutineDto[]>(this.baseUrl);
  }

  findById(id: string): Observable<RoutineDto> {
    return this.http.get<RoutineDto>(`${this.baseUrl}/${id}`);
  }

  create(payload: RoutineFormData): Observable<{ message: string; routineId: number }> {
    return this.http.post<{ message: string; routineId: number }>(this.baseUrl, payload);
  }

  update(id: string, payload: Partial<RoutineFormData>): Observable<{ message: string }> {
    return this.http.put<{ message: string }>(`${this.baseUrl}/${id}`, payload);
  }

  delete(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.baseUrl}/${id}`);
  }
}
