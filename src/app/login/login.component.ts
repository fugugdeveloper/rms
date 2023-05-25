import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../auth/user.service';
import { UserAuthService } from '../auth/user-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  constructor(
    private userService: UserService,
    private userAuthService: UserAuthService,
    private router: Router){}
  ngOnInit(): void {

  }
login(loginForm:NgForm){
  this.userService.login(loginForm.value).subscribe((response:any)=>{
    this.userAuthService.setRoles(response.role);
    this.userAuthService.setToken(response.access_token);
   console.log("Role: ", response.role);
   if(response.role==="ADMIN"){
    this.router.navigate(['home']);
   }else{
    this.router.navigate(['home']);
   }
  },
  (error)=>{
    console.log("Error: ", error);
  });
}
}
