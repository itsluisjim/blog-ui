import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { Observable, map, take } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

/**
 * Protects path from being accessible if authorization
 * is not established and user is not an Admin. Currenly only applied to /manage
 */
export const AdminGuard: CanActivateFn = ():
  | boolean
  | UrlTree
  | Promise<boolean | UrlTree>
  | Observable<boolean | UrlTree> => {
  const authService = inject(AuthService);
  const router = inject(Router);
  return authService.user.pipe(
    take(1),
    map((user) => {

      const isAuth = !!user; // same as user ? true : false;
      if (isAuth && user.admin) {
        return true;
      }
      return router.createUrlTree(['/feed']);
    })
  );
};
