/**
 * Entidad de dominio: User
 * Representa al usuario de WorldFit. Sin dependencias de framework.
 */
export class User {
  constructor(
    public readonly id: string,
    public readonly email: string,
    public readonly fullName: string
  ) {}
}

export interface AuthSession {
  token: string;
  user: User;
}
