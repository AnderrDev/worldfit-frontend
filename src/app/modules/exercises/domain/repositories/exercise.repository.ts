import { Observable } from 'rxjs';
import { Exercise, ExerciseFormData } from '../entities/exercise.entity';

export abstract class ExerciseRepository {
  abstract findAll(): Observable<Exercise[]>;
  abstract findById(id: string): Observable<Exercise>;
  abstract create(exercise: ExerciseFormData): Observable<void>;
  abstract update(id: string, exercise: Partial<ExerciseFormData>): Observable<void>;
  abstract delete(id: string): Observable<void>;
}
