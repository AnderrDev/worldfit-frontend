import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RoutineRepository } from '../repositories/routine.repository';
import { Routine } from '../entities/routine.entity';

@Injectable()
export class GetAllRoutinesUseCase {
  constructor(private readonly routineRepository: RoutineRepository) {}

  execute(): Observable<Routine[]> {
    return this.routineRepository.findAll();
  }
}
