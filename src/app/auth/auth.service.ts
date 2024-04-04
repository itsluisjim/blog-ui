import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';
import { environment } from 'src/env/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  user = new BehaviorSubject<User>(null);
  tokenTimer: any;

  constructor(private http: HttpClient, private router: Router) {}

  signup(
    username: string,
    password: string,
    first: string,
    last: string,
    email: string
  ) {
    return this.http
      .post<any>(`${environment.BASE_URL}${environment.SIGNUP}`, {
        username,
        password,
        first,
        last,
        email,
      })
      .pipe(
        catchError(this.errorHandler),
        tap((response) => {
          // tap into response data to create a user
          this.handleAuthentication(response.data.user, response.data.token);
        })
      );
  }

  login(username: string, password: string) {
    return this.http
      .post<any>(`${environment.BASE_URL}${environment.LOGIN}`, {
        username: username,
        password: password,
      })
      .pipe(
        catchError(this.errorHandler),
        tap((response) => {
          // tap into response data to create a user
          this.handleAuthentication(response.data.user, response.data.token);
        })
      );
  }

  private handleAuthentication(user: any, token: string) {
    let userInfo = new User(
      user.username,
      user._id,
      token,
      user.first,
      user.last,
      user.email,
      user.admin
    );

    this.user.next(userInfo);

    const decodedToken = this.decodeToken(userInfo.token);

    const remainingTime = this.tokenTTL(decodedToken.exp);

    this.autoLogout(remainingTime);

    localStorage.setItem('userData', JSON.stringify(userInfo));
  }

  logout() {
    this.user.next(null);
    console.log('Inside Logout()');
    this.router.navigate(['./auth']);
    localStorage.removeItem('userData');

    if (this.tokenTimer) {
      clearTimeout(this.tokenTimer);
    }

    this.tokenTimer = null;
  }

  autoLogout(expirationTime: number) {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, expirationTime);
  }

  autoLogin() {
    const localData: {
      username: string;
      email: string;
      _id: string;
      first: string;
      last: string;
      admin: boolean;
      _token: string;
    } = JSON.parse(localStorage.getItem('userData'));

    if (!localData) {
      return;
    }

    const loadedUser = new User(
      localData.username,
      localData._id,
      localData._token,
      localData.first,
      localData.last,
      localData.email,
      localData.admin
    );
    if (loadedUser.token && !this.isTokenExpired(loadedUser.token)) {
      const decodedToken = this.decodeToken(loadedUser.token);

      this.user.next(loadedUser);

      const remainingTime = this.tokenTTL(decodedToken.exp);

      this.autoLogout(remainingTime);
    } else {
      localStorage.removeItem('userData');
    }
  }

  private isTokenExpired(token: string): boolean {
    const decodedToken = this.decodeToken(token);
    const expirationDate = new Date(decodedToken.exp * 1000); // Convert expiration to milliseconds
    return expirationDate <= new Date(); // Check if expiration date is in the past
  }

  private decodeToken(token: string): any {
    const payload = token.split('.')[1];
    return JSON.parse(atob(payload));
  }

  private tokenTTL(tokenExpiration: number) {
    const expirationTime = new Date(tokenExpiration * 1000).getTime();
    const currentTime = new Date().getTime();
    const remainingTime = new Date(expirationTime - currentTime).getTime();

    return remainingTime;
  }

  private errorHandler(errorResponse: HttpErrorResponse) {
    let errorMessage = 'An unknown error occured.';
    if (!errorResponse.error || !errorResponse.error.errors) {
      return throwError(() => new Error(errorMessage));
    }

    const errorMessages: string[] = [];

    const errors = errorResponse.error.errors;
    for (const error of errors) {
        if (error.message) {
            errorMessages.push(error.message);
        }
    }

    return throwError(() => errorMessages);
  } 
}
