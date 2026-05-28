import { of } from 'rxjs';
import { ExerciseRepositoryImpl } from './exercise.repository.impl';
import { ExerciseRemoteDataSource, ExerciseDto } from '../datasources/exercise-remote.datasource';
import { Exercise } from '../../domain/entities/exercise.entity';

describe('ExerciseRepositoryImpl', () => {
  let remote: jasmine.SpyObj<ExerciseRemoteDataSource>;
  let repo: ExerciseRepositoryImpl;
  const dto: ExerciseDto = { id: '1', name: 'Deadlift', muscleGroup: 'back', sets: 5, reps: 5 };

  beforeEach(() => {
    remote = jasmine.createSpyObj<ExerciseRemoteDataSource>('ExerciseRemoteDataSource', ['findAll', 'findById']);
    repo = new ExerciseRepositoryImpl(remote);
  });

  it('findAll maps dtos into Exercise entities', (done) => {
    remote.findAll.and.returnValue(of([dto]));

    repo.findAll().subscribe((list) => {
      expect(remote.findAll).toHaveBeenCalled();
      expect(list.length).toBe(1);
      expect(list[0]).toBeInstanceOf(Exercise);
      expect(list[0].name).toBe('Deadlift');
      done();
    });
  });

  it('findById maps a dto into an Exercise entity', (done) => {
    remote.findById.and.returnValue(of(dto));

    repo.findById('1').subscribe((exercise) => {
      expect(remote.findById).toHaveBeenCalledWith('1');
      expect(exercise).toBeInstanceOf(Exercise);
      expect(exercise.muscleGroup).toBe('back');
      done();
    });
  });
});
