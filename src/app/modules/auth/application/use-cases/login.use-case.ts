import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthRepository } from '../../domain/repositories/auth.repository';
import { AuthSession } from '../../domain/entities/user.entity';

/**
 * Caso de uso: Login.
 * Orquesta la regla de aplicacion. Solo depende del puerto (AuthRepository).
 */
@Injectable({ providedIn: 'root' })
export class LoginUseCase {
  constructor(private readonly authRepository: AuthRepository) {}

  execute(email: string, password: string): Observable<AuthSession> {
    if (!email || !password) {
      throw new Error('Email y password son obligatorios.');
    }
    return this.authRepository.login(email, password);
  }
}
