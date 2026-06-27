import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { SessionService } from '../services/session.service';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const session = inject(SessionService);
  if (!session.isLoggedIn) {
    router.navigate(['/auth']);
    return false;
  }
  return true;
};

export const adminGuard: CanActivateFn = (): boolean | UrlTree => {
  const router = inject(Router);
  const session = inject(SessionService);
  if (!session.isLoggedIn) {
    return router.createUrlTree(['/auth']);
  }
  if (!session.isAdmin) {
    return router.createUrlTree(['/routines']);
  }
  return true;
};
