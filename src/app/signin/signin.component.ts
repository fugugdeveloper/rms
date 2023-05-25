import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserAuthService } from '../auth/user-auth.service';
import { UserService } from '../auth/user.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent {
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
    this.router.navigate(['pep-sanction']);
   }else{
    this.router.navigate(['pep-sanction']);
   }
  },
  (error)=>{
    console.log("Error: ", error);
  });
}
}
