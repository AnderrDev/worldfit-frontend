import { of } from 'rxjs';
import { GetAllExercisesUseCase } from './get-all-exercises.usecase';
import { ExerciseRepository } from '../repositories/exercise.repository';
import { Exercise } from '../entities/exercise.entity';

describe('GetAllExercisesUseCase', () => {
  it('delegates to exerciseRepository.findAll', (done) => {
    const repo = jasmine.createSpyObj<ExerciseRepository>('ExerciseRepository', ['findAll', 'findById']);
    const list = [new Exercise('1', 'Bench Press', 'chest', 3, 10)];
    repo.findAll.and.returnValue(of(list));
    const useCase = new GetAllExercisesUseCase(repo);

    useCase.execute().subscribe((res) => {
      expect(res).toBe(list);
      expect(repo.findAll).toHaveBeenCalledTimes(1);
      done();
    });
  });
});
