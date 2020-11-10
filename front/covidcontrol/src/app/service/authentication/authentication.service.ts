import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { JwtHelperService } from "@auth0/angular-jwt";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private jwtHelper: JwtHelperService = new JwtHelperService();

  constructor(private cookieService: CookieService) { }

  public authenticate(): void {
    let token: string = "";
    this.cookieService.set(environment.AUTHENTICATION.COOKIE.USER, token);
  }

  public isLogged(): boolean {
    let result: boolean = false;
    let cookie: string = this.getToken();
    try {
      if (!this.jwtHelper.isTokenExpired(cookie)) {
        result = true;
      } else {
        this.cookieService.delete(environment.AUTHENTICATION.COOKIE.USER);
      }
    } catch (error) {
      this.cookieService.delete(environment.AUTHENTICATION.COOKIE.USER);
    }
    return result;
  }

  public getToken(): string {
    return this.cookieService.get(environment.AUTHENTICATION.COOKIE.USER);
  }

  public getUser(): Object {
    let result: Object;
    try {
      result = this.jwtHelper.decodeToken(this.getToken());
    } catch (error) {
      result = {};
    }
    return result;
  }
}
