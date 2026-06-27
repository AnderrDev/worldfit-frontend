import { Observable } from 'rxjs';
import { AuthSession } from '../entities/user.entity';

/**
 * Puerto de salida: contrato que cualquier implementacion de auth debe cumplir.
 * El dominio no conoce HTTP, ni firebase, ni nada de infraestructura.
 */
export abstract class AuthRepository {
  abstract login(email: string, password: string): Observable<AuthSession>;
  abstract register(email: string, password: string, fullName: string): Observable<void>;
  abstract logout(): Observable<void>;
}
