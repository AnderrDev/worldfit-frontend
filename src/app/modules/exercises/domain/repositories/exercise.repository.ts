import { Observable } from 'rxjs';
import { Exercise } from '../entities/exercise.entity';

export abstract class ExerciseRepository {
  abstract findAll(): Observable<Exercise[]>;
  abstract findById(id: string): Observable<Exercise>;
}
