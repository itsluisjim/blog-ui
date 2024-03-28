import {
    HttpHandler,
    HttpHeaders,
    HttpInterceptor,
    HttpParams,
    HttpRequest,
  } from '@angular/common/http';
  import { Injectable } from '@angular/core';
  import { exhaustMap, take } from 'rxjs';
  import { AuthService } from './auth.service';
  
  
  /**
   * All request are intercepted and depending on the request
   * it will add a auth header if necessary.
   */
  
  @Injectable()
  export class AuthInterceptorService implements HttpInterceptor {
    constructor(private authService: AuthService) {}
  
    intercept(req: HttpRequest<any>, next: HttpHandler) {
      return this.authService.user.pipe(
        take(1),
        exhaustMap((user) => {
  
          // for requests like sign up and login that don't need auth param
          if (!user) {
            return next.handle(req);
          }
  
          const modifiedReq = req.clone({
            headers: new HttpHeaders().set('authorization', `Bearer ${user.token}`)
          });
          return next.handle(modifiedReq);
        })
      );
    }
  }
  