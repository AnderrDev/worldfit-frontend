import { of } from 'rxjs';
import { RoutineRepositoryImpl } from './routine.repository.impl';
import { RoutineRemoteDataSource, RoutineDto } from '../datasources/routine-remote.datasource';
import { Routine } from '../../domain/entities/routine.entity';

describe('RoutineRepositoryImpl', () => {
  let remote: jasmine.SpyObj<RoutineRemoteDataSource>;
  let repo: RoutineRepositoryImpl;
  const dto: RoutineDto = {
    id: '1',
    name: 'Full body',
    description: 'All muscles',
    difficulty: 'advanced',
    exerciseIds: ['e1', 'e2', 'e3']
  };

  beforeEach(() => {
    remote = jasmine.createSpyObj<RoutineRemoteDataSource>('RoutineRemoteDataSource', [
      'findAll',
      'findById',
      'create',
      'update',
      'delete'
    ]);
    repo = new RoutineRepositoryImpl(remote);
  });

  it('findAll maps dtos into Routine entities', (done) => {
    remote.findAll.and.returnValue(of([dto]));

    repo.findAll().subscribe((list) => {
      expect(list[0]).toBeInstanceOf(Routine);
      expect(list[0].totalExercises).toBe(3);
      done();
    });
  });

  it('findById maps a dto into a Routine entity', (done) => {
    remote.findById.and.returnValue(of(dto));

    repo.findById('1').subscribe((routine) => {
      expect(remote.findById).toHaveBeenCalledWith('1');
      expect(routine).toBeInstanceOf(Routine);
      done();
    });
  });

  it('create forwards the payload and maps the result', (done) => {
    remote.create.and.returnValue(of(dto));
    const payload = {
      name: 'Full body',
      description: 'All muscles',
      difficulty: 'advanced' as const,
      exerciseIds: ['e1', 'e2', 'e3']
    };

    repo.create(payload).subscribe((routine) => {
      expect(remote.create).toHaveBeenCalledWith(payload);
      expect(routine).toBeInstanceOf(Routine);
      done();
    });
  });

  it('update forwards the changes and maps the result', (done) => {
    remote.update.and.returnValue(of(dto));

    repo.update('1', { name: 'Renamed' }).subscribe((routine) => {
      expect(remote.update).toHaveBeenCalledWith('1', { name: 'Renamed' });
      expect(routine).toBeInstanceOf(Routine);
      done();
    });
  });

  it('delete delegates to the datasource', (done) => {
    remote.delete.and.returnValue(of(void 0));

    repo.delete('1').subscribe(() => {
      expect(remote.delete).toHaveBeenCalledWith('1');
      done();
    });
  });
});
