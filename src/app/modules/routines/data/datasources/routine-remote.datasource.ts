import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';

export interface RoutineDto {
  id: string;
  name: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  exerciseIds: string[];
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

  create(payload: Omit<RoutineDto, 'id'>): Observable<RoutineDto> {
    return this.http.post<RoutineDto>(this.baseUrl, payload);
  }

  update(id: string, payload: Partial<RoutineDto>): Observable<RoutineDto> {
    return this.http.patch<RoutineDto>(`${this.baseUrl}/${id}`, payload);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
