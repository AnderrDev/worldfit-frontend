import { of } from 'rxjs';
import { GetAllRoutinesUseCase } from './get-all-routines.usecase';
import { RoutineRepository } from '../repositories/routine.repository';
import { Routine } from '../entities/routine.entity';

describe('GetAllRoutinesUseCase', () => {
  it('delegates to routineRepository.findAll', (done) => {
    const repo = jasmine.createSpyObj<RoutineRepository>('RoutineRepository', [
      'findAll',
      'findById',
      'create',
      'update',
      'delete'
    ]);
    const list = [new Routine('1', 'Push', 'Push day', 'beginner', ['e1'])];
    repo.findAll.and.returnValue(of(list));
    const useCase = new GetAllRoutinesUseCase(repo);

    useCase.execute().subscribe((res) => {
      expect(res).toBe(list);
      expect(repo.findAll).toHaveBeenCalledTimes(1);
      done();
    });
  });
});
