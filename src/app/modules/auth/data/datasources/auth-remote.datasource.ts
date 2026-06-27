import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';

export interface AuthResponseDto {
  message?: string;
  token: string;
  user?: { id: string; email: string; fullName: string };
}

export interface RegisterResponseDto {
  message: string;
  userId: number;
}

@Injectable()
export class AuthRemoteDataSource {
  private readonly baseUrl = environment.apiUrl;

  constructor(private readonly http: HttpClient) {}

  login(email: string, password: string): Observable<AuthResponseDto> {
    return this.http.post<AuthResponseDto>(`${this.baseUrl}/login`, { email, password });
  }

  register(email: string, password: string, fullName: string): Observable<RegisterResponseDto> {
    return this.http.post<RegisterResponseDto>(`${this.baseUrl}/users`, {
      name: fullName,
      email,
      password,
      role: 'user',
      status: 1
    });
  }

  logout(): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/logout`, {});
  }
}
