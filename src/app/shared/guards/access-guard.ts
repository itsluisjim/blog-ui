import { inject } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, map, of, switchMap, take, tap } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { BlogService } from 'src/app/blogs/blog.service';
import { User } from 'src/app/auth/user.model';
import { Blog } from 'src/app/blogs/blog-list/blog.model';

/**
 * Protects paths from being accessible if authorization
 * is not established. Currenly only applied to /feed
 */

export const AccessGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
):
  | boolean
  | UrlTree
  | Promise<boolean | UrlTree>
  | Observable<boolean | UrlTree> => {

  const authService = inject(AuthService);
  const blogService = inject(BlogService);
  const router = inject(Router);

  return authService.user.pipe(
    take(1),
    switchMap(user => {
      if (!user) {
        return of(router.createUrlTree(['/auth']));
      }
      
      // Assuming you have a 'id' parameter in the route
      const blogId = route.params['id'];
      
      return blogService.getBlogById(blogId).pipe(
        take(1),
        map(blog => {
          if (!blog) {
            // Handle case where blog is not found
            return router.createUrlTree(['/feed']);
          }

          // Assuming you have an 'authorId' property in the blog object
          if (blog.author._id !== user._id) {
            // Redirect or handle unauthorized access
            return router.createUrlTree(['/feed']);
          }

          return true; // Allow access
        })
      );
    })
  );
};
