import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';

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
      .post<any>(`http://localhost:3000/auth/signup`, {
        username,
        password,
        first,
        last,
        email,
      })
      .pipe(
        tap((response) => {
          // tap into response data to create a user
          this.handleAuthentication(response.data.user, response.data.token);
        })
      );
  }

  login(username: string, password: string) {
    return this.http
      .post<any>(`http://localhost:3000/auth/login`, {
        username: username,
        password: password,
      })
      .pipe(
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
}

// userData	{"username":"ChuchoBenitez11","id":"65fe5f04c5559bfc4f90df8c","_token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuZXdVc2VyIjp7InVzZXJuYW1lIjoiQ2h1Y2hvQmVuaXRlejExIiwiZW1haWwiOiJDYmVuaXRlekBnbWFpbC5jb20iLCJmaXJzdCI6IkNodWNobyIsImxhc3QiOiJCZW5pdGV6IiwiYWRtaW4iOnRydWUsIl9pZCI6IjY1ZmU1ZjA0YzU1NTliZmM0ZjkwZGY4YyJ9LCJpYXQiOjE3MTEzNDM5MjAsImV4cCI6MTcxMTM0Mzk4MH0.LSCEu0kiVLGqaEWw4ks2Ge322xw3F61MwCnWSRwMLAA","first":"Chucho","last":"Benitez","email":"Cbenitez@gmail.com","admin":true}
