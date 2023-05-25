import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from './auth/user-auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  constructor(private router: Router, private userAuthService: UserAuthService){}
  ngOnInit(): void {

  }

  title = 'rms';
  public isLoggedIn(){
    return this.userAuthService.isLoggedIn();
  }
  public logout(){
    this.userAuthService.authLogout();
    this.userAuthService.clear();
    this.router.navigate(['/'])

  }
}
