import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserAuthService } from './user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseAuthUrl = "http://localhost:8081/api/v1/auth/authenticate";
  private baseLogoutUrl = "http://localhost:8081/api/v1/auth/logout";
  requestHeader = new HttpHeaders({
    "No-Auth": "True"
  })
  constructor(private httpClient: HttpClient, private userAuthService: UserAuthService) { }
  public login(loginData) {
     return this.httpClient.post(this.baseAuthUrl, loginData);//, { headers: this.requestHeader });
  }
  public authLogout(){
    return this.httpClient.get(this.baseLogoutUrl);
  }
  public roleMatch(allowRoles): boolean {
    let isMatch = false;
    const userRoles: any = this.userAuthService.getRoles();
    if (userRoles != null && userRoles) {
      if (userRoles === allowRoles) {
        isMatch = true

      }
      return isMatch;
    } else {
      return isMatch;
    }
  }
}
