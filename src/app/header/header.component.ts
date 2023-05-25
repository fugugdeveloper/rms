import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { UserService } from '../auth/user.service';
import { UserAuthService } from '../auth/user-auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  showTable: boolean = true;
  constructor(private router: Router, public userService: UserService, private userAuthService: UserAuthService){  }
public roleMatch(role){
  this.userService.roleMatch(role);
}
public isLoggedIn(){
  return this.userAuthService.isLoggedIn();
}

public logout(){
  this.userAuthService.authLogout();
  this.userAuthService.clear();
  this.router.navigate(['/'])

}
}
