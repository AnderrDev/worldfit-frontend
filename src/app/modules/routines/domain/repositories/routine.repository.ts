import { Observable } from 'rxjs';
import { Routine } from '../entities/routine.entity';

export abstract class RoutineRepository {
  abstract findAll(): Observable<Routine[]>;
  abstract findById(id: string): Observable<Routine>;
  abstract create(routine: Omit<Routine, 'id' | 'totalExercises'>): Observable<Routine>;
  abstract update(id: string, routine: Partial<Routine>): Observable<Routine>;
  abstract delete(id: string): Observable<void>;
}
