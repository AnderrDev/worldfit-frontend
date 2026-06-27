import { Injectable } from '@angular/core';

type TokenPayload = {
  id?: number;
  email?: string;
  role?: 'user' | 'admin';
  exp?: number;
};

@Injectable({ providedIn: 'root' })
export class SessionService {
  get token(): string | null {
    return localStorage.getItem('wf_token');
  }

  get isLoggedIn(): boolean {
    return Boolean(this.token);
  }

  get role(): 'user' | 'admin' | null {
    return this.payload?.role ?? null;
  }

  get isAdmin(): boolean {
    return this.role === 'admin';
  }

  logout(): void {
    localStorage.removeItem('wf_token');
  }

  private get payload(): TokenPayload | null {
    const token = this.token;
    if (!token) return null;

    try {
      const base64 = token.split('.')[1];
      const normalized = base64.replace(/-/g, '+').replace(/_/g, '/');
      return JSON.parse(atob(normalized)) as TokenPayload;
    } catch {
      return null;
    }
  }
}
