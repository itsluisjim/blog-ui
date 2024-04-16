import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { faSignOut } from '@fortawesome/free-solid-svg-icons'
import { User } from '../auth/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  faSignOut = faSignOut;

  private userSubscription: Subscription;
  isAuthenticated = false;
  user: User;
  

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
      this.userSubscription = this.authService.user.subscribe(user => {
       this.isAuthenticated = !!user;

       if(this.isAuthenticated){
        this.user = user;
       }
      })
  }


  ngOnDestroy(): void {
      this.userSubscription.unsubscribe();
  }

  onLogout(){
    this.authService.logout();
  }
}
