import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ExerciseRemoteDataSource, ExerciseDto } from './exercise-remote.datasource';
import { environment } from '@env/environment';

describe('ExerciseRemoteDataSource', () => {
  let ds: ExerciseRemoteDataSource;
  let httpMock: HttpTestingController;
  const base = `${environment.apiUrl}/exercises`;
  const dto: ExerciseDto = { id: '1', name: 'Squat', muscleGroup: 'legs', sets: 4, reps: 8 };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ExerciseRemoteDataSource]
    });
    ds = TestBed.inject(ExerciseRemoteDataSource);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('findAll GETs the exercises list', () => {
    let result: ExerciseDto[] | undefined;
    ds.findAll().subscribe((r) => (result = r));

    const req = httpMock.expectOne(base);
    expect(req.request.method).toBe('GET');
    req.flush([dto]);

    expect(result).toEqual([dto]);
  });

  it('findById GETs a single exercise', () => {
    let result: ExerciseDto | undefined;
    ds.findById('1').subscribe((r) => (result = r));

    const req = httpMock.expectOne(`${base}/1`);
    expect(req.request.method).toBe('GET');
    req.flush(dto);

    expect(result).toEqual(dto);
  });
});
