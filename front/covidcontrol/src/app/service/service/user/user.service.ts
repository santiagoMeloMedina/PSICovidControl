import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Citizen } from 'src/app/model/citizen.model';
import { Admin } from 'src/app/model/admin.model';
import { ES } from 'src/app/model/es.model';
import { EP } from 'src/app/model/ep.model';
import { Response } from 'src/app/model/response.model';
import { User } from 'src/app/model/user.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  public createAdmin(data: Object): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      console.log(data);
      resolve(true);
    });
  }

  public getUser(username: string): Promise<User> {
    let body: Object = {"username": username};
    return new Promise<User>((resolve, reject) => {
      let path: string = `${environment.PETITION.ENDPOINTS.USER.POST.USER.URL}`;
      let url: string = `${environment.PETITION.API}${path}`;
      this.httpClient.post(url, body, {}).subscribe(data => {
        let response: Response = new Response(data);
        let result: User = null;
        if (response.getCode() == environment.HTTP_CODES.SUCCESS) {
          result = new User().deserealize(response.getResponse()['content']);
        }
        resolve(result);
      });
    });
  }

  public getCitizen(username: string): Promise<Citizen> {
    let body: Object = {"username": username};
    return new Promise<Citizen>((resolve, reject) => {
      let path: string = `${environment.PETITION.ENDPOINTS.USER.POST.USER.URL}`;
      let url: string = `${environment.PETITION.API}${path}`;
      this.httpClient.post(url, body, {}).subscribe(data => {
        let response: Response = new Response(data);
        let result: Citizen = null;
        if (response.getCode() == environment.HTTP_CODES.SUCCESS) {
          result = new Citizen().deserealize(response.getResponse()['content']);
        }
        resolve(result);
      });
    });
  }

  public getAdmin(username: string): Promise<Admin> {
    let body: Object = {"username": username};
    return new Promise<Admin>((resolve, reject) => {
      let path: string = `${environment.PETITION.ENDPOINTS.USER.POST.USER.URL}`;
      let url: string = `${environment.PETITION.API}${path}`;
      this.httpClient.post(url, body, {}).subscribe(data => {
        let response: Response = new Response(data);
        let result: Admin = null;
        if (response.getCode() == environment.HTTP_CODES.SUCCESS) {
          result = new Admin().deserealize(response.getResponse()['content']);
        }
        resolve(result);
      });
    });
  }

  public getES(username: string): Promise<ES> {
    let body: Object = {"username": username};
    return new Promise<ES>((resolve, reject) => {
      let path: string = `${environment.PETITION.ENDPOINTS.USER.POST.USER.URL}`;
      let url: string = `${environment.PETITION.API}${path}`;
      this.httpClient.post(url, body, {}).subscribe(data => {
        let response: Response = new Response(data);
        let result: ES = null;
        if (response.getCode() == environment.HTTP_CODES.SUCCESS) {
          result = new ES().deserealize(response.getResponse()['content']);
        }
        resolve(result);
      });
    });
  }

  public getEP(username: string): Promise<EP> {
    let body: Object = {"username": username};
    return new Promise<EP>((resolve, reject) => {
      let path: string = `${environment.PETITION.ENDPOINTS.USER.POST.USER.URL}`;
      let url: string = `${environment.PETITION.API}${path}`;
      this.httpClient.post(url, body, {}).subscribe(data => {
        let response: Response = new Response(data);
        let result: EP = null;
        if (response.getCode() == environment.HTTP_CODES.SUCCESS) {
          result = new EP().deserealize(response.getResponse()['content']);
        }
        resolve(result);
      });
    });
  }

  public getEnabledDisabledUsers(start: number, limit: number): Promise<User[]> {
    return new Promise<User[]>((resolve, reject) => {
      let path: string = `${environment.PETITION.ENDPOINTS.USER.GET.ENABLE_DISABLE.URL(start, limit)}`;
      let url: string = `${environment.PETITION.API}${path}`;
      this.httpClient.get(url, {}).subscribe(data => {
        let response: Response = new Response(data);
        let result: User[] = [];
        if (response.getCode() == environment.HTTP_CODES.SUCCESS) {
          response.getResponse()['content'].forEach(user => {
            user['department'] = "valle"; // TODO(Santiago): Change this when the result is obtained from api.
            result.push(new User().deserealize(user));
          });
        }
        resolve(result);
      });
    });
  }

  public getUnauthorizedUsers(start: number, limit: number): Promise<User[]> {
    return new Promise<User[]>((resolve, reject) => {
      let path: string = `${environment.PETITION.ENDPOINTS.USER.GET.NOT_AUTHORIZED.URL(start, limit)}`;
      let url: string = `${environment.PETITION.API}${path}`;
      this.httpClient.get(url, {}).subscribe(data => {
        let response: Response = new Response(data);
        let result: User[] = [];
        if (response.getCode() == environment.HTTP_CODES.SUCCESS) {
          response.getResponse()['content'].forEach(user => {
            user['department'] = "valle"; // TODO(Santiago): Change this when the result is obtained from api.
            result.push(new User().deserealize(user));
          });
        }
        resolve(result);
      });
    });
  }

  public authorizeUser(username: string, rol: string): Promise<boolean> {
    let body: Object = {"username": username, "rol": rol, "state": 'A'};
    return new Promise<boolean>((resolve, reject) => {
      let path: string = `${environment.PETITION.ENDPOINTS.USER.POST.AUTHORIZED.URL}`;
      let url: string = `${environment.PETITION.API}${path}`;
      this.httpClient.post(url, body, {}).subscribe(data => {
        let response: Response = new Response(data);
        let result: boolean = false;
        if (response.getCode() == environment.HTTP_CODES.SUCCESS) {
          result = response.getResponse()['content'];
        }
        resolve(result);
      });
    });
  }

  public enableUser(rol: string, username: string): Promise<boolean> {
    let body: Object = {"username": username, "rol": rol, "state": 'A'};
    return new Promise<boolean>((resolve, reject) => {
      let path: string = `${environment.PETITION.ENDPOINTS.USER.POST.AUTHORIZED.URL}`;
      let url: string = `${environment.PETITION.API}${path}`;
      this.httpClient.post(url, body, {}).subscribe(data => {
        let response: Response = new Response(data);
        let result: boolean = false;
        if (response.getCode() == environment.HTTP_CODES.SUCCESS) {
          result = response.getResponse()['content'];
        }
        resolve(result);
      });
    });
  }

  public disableUser(rol: string, username: string): Promise<boolean> {
    let body: Object = {"username": username, "rol": rol, "state": 'I'};
    return new Promise<boolean>((resolve, reject) => {
      let path: string = `${environment.PETITION.ENDPOINTS.USER.POST.AUTHORIZED.URL}`;
      let url: string = `${environment.PETITION.API}${path}`;
      this.httpClient.post(url, body, {}).subscribe(data => {
        let response: Response = new Response(data);
        let result: boolean = false;
        if (response.getCode() == environment.HTTP_CODES.SUCCESS) {
          result = response.getResponse()['content'];
        }
        resolve(result);
      });
    });
  }

  public updateUser(id: string, username: string, data: Object): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      resolve(true);
    });
  }
  
}
