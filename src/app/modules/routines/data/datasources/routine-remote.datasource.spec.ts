import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RoutineRemoteDataSource, RoutineDto } from './routine-remote.datasource';
import { environment } from '@env/environment';

describe('RoutineRemoteDataSource', () => {
  let ds: RoutineRemoteDataSource;
  let httpMock: HttpTestingController;
  const base = `${environment.apiUrl}/routines`;
  const dto: RoutineDto = {
    id: '1',
    name: 'Full body',
    description: 'All muscles',
    difficulty: 'intermediate',
    exerciseIds: ['e1', 'e2']
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RoutineRemoteDataSource]
    });
    ds = TestBed.inject(RoutineRemoteDataSource);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('findAll GETs the routines list', () => {
    let result: RoutineDto[] | undefined;
    ds.findAll().subscribe((r) => (result = r));

    const req = httpMock.expectOne(base);
    expect(req.request.method).toBe('GET');
    req.flush([dto]);

    expect(result).toEqual([dto]);
  });

  it('findById GETs a single routine', () => {
    ds.findById('1').subscribe();

    const req = httpMock.expectOne(`${base}/1`);
    expect(req.request.method).toBe('GET');
    req.flush(dto);
  });

  it('create POSTs the payload', () => {
    const payload = {
      name: 'Full body',
      description: 'All muscles',
      difficulty: 'intermediate' as const,
      exerciseIds: ['e1', 'e2']
    };
    ds.create(payload).subscribe();

    const req = httpMock.expectOne(base);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(payload);
    req.flush(dto);
  });

  it('update PATCHes the routine', () => {
    ds.update('1', { name: 'Renamed' }).subscribe();

    const req = httpMock.expectOne(`${base}/1`);
    expect(req.request.method).toBe('PATCH');
    expect(req.request.body).toEqual({ name: 'Renamed' });
    req.flush(dto);
  });

  it('delete DELETEs the routine', () => {
    ds.delete('1').subscribe();

    const req = httpMock.expectOne(`${base}/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});
