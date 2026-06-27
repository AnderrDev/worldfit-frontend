import { Observable } from 'rxjs';
import { Routine, RoutineFormData } from '../entities/routine.entity';

export abstract class RoutineRepository {
  abstract findAll(): Observable<Routine[]>;
  abstract findById(id: string): Observable<Routine>;
  abstract create(routine: RoutineFormData): Observable<void>;
  abstract update(id: string, routine: Partial<RoutineFormData>): Observable<void>;
  abstract delete(id: string): Observable<void>;
}
