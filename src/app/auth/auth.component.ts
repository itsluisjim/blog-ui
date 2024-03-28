import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, Subscription, first, last } from 'rxjs';
import { Router } from '@angular/router';



import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {

  isLoginMode = true;
  isLoading = false;

  constructor(private authService: AuthService, private router: Router) {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  submitForm(authForm: NgForm) {
    if (!authForm.valid) {
      return;
    }

    // retrieve form data
    const username = authForm.value.username;
    const password = authForm.value.password;

    let authObservable: Observable<any>;

    this.isLoading = true;
    if (this.isLoginMode) {
      authObservable = this.authService.login(username, password);
    } else {

      const first = authForm.value.first;
      const last = authForm.value.last;
      const email = authForm.value.email;

      authObservable = this.authService.signup(username, password,first, last, email);
    }

    authObservable.subscribe({
      next: (response: any) => {
        this.isLoading = false;
        this.router.navigate(['/feed']);
      },
      error: (error: any) => {
        console.log(error)
      },
      complete() {}, 
    })
    
    authForm.reset();
  }
}
