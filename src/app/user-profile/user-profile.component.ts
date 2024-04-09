import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from '../auth/user.model';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit, OnDestroy {

  user: User;
  userSubscription: Subscription;
  isAuthenticated =  false;


  constructor(private authService: AuthService){}
  
  
  ngOnInit(): void {
    this.userSubscription = this.authService.user
    .subscribe((user) => {
      this.isAuthenticated = !!user;

      if(this.isAuthenticated) {
        this.user = user
      }
    })
  }
  
  ngOnDestroy(): void {
    
  }
  

}
