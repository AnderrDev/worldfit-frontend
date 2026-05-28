import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { AuthRepository } from '../../domain/repositories/auth.repository';
import { AuthSession, User } from '../../domain/entities/user.entity';
import { environment } from '@env/environment';

interface AuthResponseDto {
  token: string;
  user: { id: string; email: string; fullName: string };
}

/**
 * Adaptador de salida: implementa el puerto AuthRepository contra una API HTTP.
 */
@Injectable()
export class AuthHttpRepository extends AuthRepository {
  private readonly baseUrl = `${environment.apiUrl}/auth`;

  constructor(private readonly http: HttpClient) {
    super();
  }

  override login(email: string, password: string): Observable<AuthSession> {
    return this.http
      .post<AuthResponseDto>(`${this.baseUrl}/login`, { email, password })
      .pipe(map((res) => this.toDomain(res)));
  }

  override register(email: string, password: string, fullName: string): Observable<AuthSession> {
    return this.http
      .post<AuthResponseDto>(`${this.baseUrl}/register`, { email, password, fullName })
      .pipe(map((res) => this.toDomain(res)));
  }

  override logout(): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/logout`, {});
  }

  private toDomain(dto: AuthResponseDto): AuthSession {
    return {
      token: dto.token,
      user: new User(dto.user.id, dto.user.email, dto.user.fullName)
    };
  }
}
