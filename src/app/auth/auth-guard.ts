import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map, take } from 'rxjs';
import { AuthService } from './auth.service';

/**
 * Protects paths from being accessible if authorization
 * is not established. Currenly only applied to /feed
 */

export const AuthGuard: CanActivateFn = ():
  | boolean
  | UrlTree
  | Promise<boolean | UrlTree>
  | Observable<boolean | UrlTree> => {
  const authService = inject(AuthService);
  const router = inject(Router);
  return authService.user.pipe(
    take(1),
    map((user) => {
      console.log('In guard');
      console.log(user)

      const isAuth = !!user; // same as user ? true : false;
      if (isAuth) {
        return true;
      }
      return router.createUrlTree(['/auth']);
    })
  );
};
