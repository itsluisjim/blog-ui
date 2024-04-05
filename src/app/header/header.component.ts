import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { faSignOut } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  faSignOut = faSignOut;

  private userSubscription: Subscription;
  isAuthenticated = false;
  

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
      this.userSubscription = this.authService.user.subscribe(user => {
       this.isAuthenticated = !!user;
      })
  }


  ngOnDestroy(): void {
      this.userSubscription.unsubscribe();
  }

  onLogout(){
    this.authService.logout();
  }
}
