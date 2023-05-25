import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {
  private baseLogoutUrl = "http://localhost:8081/api/v1/auth/logout";
  constructor(private httpClient: HttpClient) { }
  public setRoles(roles: []){
    localStorage.setItem("role", JSON.stringify(roles));
  }
  public getRoles(){
    return JSON.parse(localStorage.getItem("role"));
  }
  public setRefreshToken(refreshToken: string){
    localStorage.setItem("refresh_token", refreshToken);
  }
  public getRefreshToken(){
    return localStorage.getItem("refresh_token");
  }
  public setToken(token: string){
    localStorage.setItem("token", token);
  }
  public getToken(){
    return localStorage.getItem("token");
  }
  public clear(){
    this.authLogout();
    localStorage.clear();
  }
  public isLoggedIn(){
    return this.getRoles() && this.getToken();
  }
  public authLogout(){
    return this.httpClient.get(this.baseLogoutUrl);
  }
}
