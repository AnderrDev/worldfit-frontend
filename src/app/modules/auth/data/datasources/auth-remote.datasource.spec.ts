import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthRemoteDataSource, AuthResponseDto } from './auth-remote.datasource';
import { environment } from '@env/environment';

describe('AuthRemoteDataSource', () => {
  let ds: AuthRemoteDataSource;
  let httpMock: HttpTestingController;
  const base = `${environment.apiUrl}/auth`;
  const dto: AuthResponseDto = { token: 't', user: { id: '1', email: 'a@a.com', fullName: 'A' } };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthRemoteDataSource]
    });
    ds = TestBed.inject(AuthRemoteDataSource);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('login POSTs credentials and returns the dto', () => {
    let result: AuthResponseDto | undefined;
    ds.login('a@a.com', 'secret').subscribe((r) => (result = r));

    const req = httpMock.expectOne(`${base}/login`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ email: 'a@a.com', password: 'secret' });
    req.flush(dto);

    expect(result).toEqual(dto);
  });

  it('register POSTs the new user data', () => {
    ds.register('a@a.com', 'secret', 'A').subscribe();

    const req = httpMock.expectOne(`${base}/register`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ email: 'a@a.com', password: 'secret', fullName: 'A' });
    req.flush(dto);
  });

  it('logout POSTs to the logout endpoint', () => {
    ds.logout().subscribe();

    const req = httpMock.expectOne(`${base}/logout`);
    expect(req.request.method).toBe('POST');
    req.flush(null);
  });
});
