import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { JwtHelperService } from "@auth0/angular-jwt";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private cookieService: CookieService) { }

  public authenticate(): void {
    let token: string = "";
    this.cookieService.set(environment.AUTHENTICATION.COOKIE.USER, token);
  }

  public getToken(): string {
    return this.cookieService.get(environment.AUTHENTICATION.COOKIE.USER);
  }

  public getUser(): Object {
    const jwt_helper: JwtHelperService = new JwtHelperService();
    let result: Object;
    try {
      result = jwt_helper.decodeToken(this.getToken());
    } catch (error) {
      result = {};
    }
    return result;
  }
}
