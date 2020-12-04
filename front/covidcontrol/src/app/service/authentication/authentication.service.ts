import { Injectable, resolveForwardRef } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { JwtHelperService } from "@auth0/angular-jwt";
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Response } from 'src/app/model/response.model'

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private jwtHelper: JwtHelperService = new JwtHelperService();

  private registerData: Object = null;

  constructor(private cookieService: CookieService, 
              private httpClient: HttpClient) { }

  public authenticate(username: string, password: string): Promise<boolean> {
    let body: Object = {"username": username, "password": password};
    return new Promise<boolean>((resolve, reject) => {
      let url: string = `${environment.PETITION.API}${environment.PETITION.ENDPOINTS.AUTHENTICATE.URL}`;
      this.httpClient.post(url, body, {}).subscribe(data => {
        let response: Response = new Response(data);
        let token: string = "";
        let result: boolean = false;
        if (response.getCode() == environment.HTTP_CODES.SUCCESS) {
          token = response.getResponse()['token'];
          result = true;
        }
        this.cookieService.set(environment.AUTHENTICATION.COOKIE.USER, token, null, "/");
        resolve(result);
      });
    });
  }

  public setRegisterData(data: Object): void {
    this.registerData = data;
  }

  public getRegisterData(): Object {
    return this.registerData;
  }

  public register(data: Object): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      let url: string = `${environment.PETITION.API}${environment.PETITION.ENDPOINTS.REGISTER.ALL.URL}`;
      this.httpClient.post(url, data, {}).subscribe(data => {
        let response: Response = new Response(data);
        let result: boolean = false;
        if (response.getCode() == environment.HTTP_CODES.SUCCESS) {
          result = true;
        }
        resolve(result);
      });
    });
  }

  public registerAdmin(data: Object): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      let url: string = `${environment.PETITION.API}${environment.PETITION.ENDPOINTS.REGISTER.ADMIN.URL}`;
      this.httpClient.post(url, data, {}).subscribe(data => {
        let response: Response = new Response(data);
        let result: boolean = false;
        if (response.getCode() == environment.HTTP_CODES.SUCCESS) {
          result = true;
        }
        resolve(result);
      });
    });
  }

  public logOut(): void {
    this.cookieService.delete(environment.AUTHENTICATION.COOKIE.USER, '/');
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
