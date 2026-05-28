import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RoutineRepository } from '../../domain/repositories/routine.repository';
import { Routine } from '../../domain/entities/routine.entity';

@Injectable({ providedIn: 'root' })
export class GetAllRoutinesUseCase {
  constructor(private readonly routineRepository: RoutineRepository) {}

  execute(): Observable<Routine[]> {
    return this.routineRepository.findAll();
  }
}
