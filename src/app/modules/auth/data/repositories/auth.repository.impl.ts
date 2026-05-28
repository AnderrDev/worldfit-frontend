import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { AuthRepository } from '../../domain/repositories/auth.repository';
import { AuthSession, User } from '../../domain/entities/user.entity';
import { AuthRemoteDataSource, AuthResponseDto } from '../datasources/auth-remote.datasource';

@Injectable()
export class AuthRepositoryImpl extends AuthRepository {
  constructor(private readonly remote: AuthRemoteDataSource) {
    super();
  }

  override login(email: string, password: string): Observable<AuthSession> {
    return this.remote.login(email, password).pipe(map((dto) => this.toDomain(dto)));
  }

  override register(email: string, password: string, fullName: string): Observable<AuthSession> {
    return this.remote.register(email, password, fullName).pipe(map((dto) => this.toDomain(dto)));
  }

  override logout(): Observable<void> {
    return this.remote.logout();
  }

  private toDomain(dto: AuthResponseDto): AuthSession {
    return {
      token: dto.token,
      user: new User(dto.user.id, dto.user.email, dto.user.fullName)
    };
  }
}
