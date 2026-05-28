import { of } from 'rxjs';
import { LoginUseCase } from './login.usecase';
import { AuthRepository } from '../repositories/auth.repository';
import { AuthSession, User } from '../entities/user.entity';

describe('LoginUseCase', () => {
  let repo: jasmine.SpyObj<AuthRepository>;
  let useCase: LoginUseCase;

  beforeEach(() => {
    repo = jasmine.createSpyObj<AuthRepository>('AuthRepository', ['login', 'register', 'logout']);
    useCase = new LoginUseCase(repo);
  });

  it('delegates to authRepository.login', (done) => {
    const session: AuthSession = { token: 't', user: new User('1', 'a@a.com', 'A') };
    repo.login.and.returnValue(of(session));

    useCase.execute('a@a.com', 'secret').subscribe((res) => {
      expect(res).toBe(session);
      expect(repo.login).toHaveBeenCalledWith('a@a.com', 'secret');
      done();
    });
  });

  it('throws when email is missing', () => {
    expect(() => useCase.execute('', 'secret')).toThrowError('Email y password son obligatorios.');
  });

  it('throws when password is missing', () => {
    expect(() => useCase.execute('a@a.com', '')).toThrowError('Email y password son obligatorios.');
  });
});
