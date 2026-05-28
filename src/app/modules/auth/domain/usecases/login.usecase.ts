import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthRepository } from '../repositories/auth.repository';
import { AuthSession } from '../entities/user.entity';

@Injectable()
export class LoginUseCase {
  constructor(private readonly authRepository: AuthRepository) {}

  execute(email: string, password: string): Observable<AuthSession> {
    if (!email || !password) {
      throw new Error('Email y password son obligatorios.');
    }
    return this.authRepository.login(email, password);
  }
}
