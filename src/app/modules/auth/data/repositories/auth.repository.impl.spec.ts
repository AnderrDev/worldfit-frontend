import { of } from 'rxjs';
import { AuthRepositoryImpl } from './auth.repository.impl';
import { AuthRemoteDataSource, AuthResponseDto } from '../datasources/auth-remote.datasource';
import { User } from '../../domain/entities/user.entity';

describe('AuthRepositoryImpl', () => {
  let remote: jasmine.SpyObj<AuthRemoteDataSource>;
  let repo: AuthRepositoryImpl;
  const dto: AuthResponseDto = { token: 't', user: { id: '1', email: 'a@a.com', fullName: 'Ana' } };

  beforeEach(() => {
    remote = jasmine.createSpyObj<AuthRemoteDataSource>('AuthRemoteDataSource', ['login', 'register', 'logout']);
    repo = new AuthRepositoryImpl(remote);
  });

  it('login maps the dto into an AuthSession with a User entity', (done) => {
    remote.login.and.returnValue(of(dto));

    repo.login('a@a.com', 'secret').subscribe((session) => {
      expect(remote.login).toHaveBeenCalledWith('a@a.com', 'secret');
      expect(session.token).toBe('t');
      expect(session.user).toBeInstanceOf(User);
      expect(session.user.id).toBe('1');
      expect(session.user.fullName).toBe('Ana');
      done();
    });
  });

  it('register maps the dto into an AuthSession', (done) => {
    remote.register.and.returnValue(of(dto));

    repo.register('a@a.com', 'secret', 'Ana').subscribe((session) => {
      expect(remote.register).toHaveBeenCalledWith('a@a.com', 'secret', 'Ana');
      expect(session.user).toBeInstanceOf(User);
      done();
    });
  });

  it('logout delegates to the datasource', (done) => {
    remote.logout.and.returnValue(of(void 0));

    repo.logout().subscribe(() => {
      expect(remote.logout).toHaveBeenCalled();
      done();
    });
  });
});
