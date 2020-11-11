import { Injectable } from '@angular/core';
import { User } from 'src/app/model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  public createAdmin(data: Object): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      console.log(data);
      resolve(true);
    });
  }

  public getUser(username: string): Promise<User> {
    return new Promise<User>((resolve, reject) => {
      let user: User = new User().deserealize({
        "id": 1,
        "rol": "Citizen",
        "name": "craaack",
        "lastname": "Cracked",
        "state": "Activo",
        "username": "crack",
        "city": "Cali",
        "department": "Valle del Cauca"
      });
      resolve(user);
    });
  }

  public getUsers(): Promise<User[]> {
    return new Promise<User[]>((resolve, reject) => {
      let result: User = new User().deserealize({
        "id": 1,
        "rol": "Citizen",
        "name": "Crack",
        "lastname": "Cracked",
        "state": "Activo",
        "username": "crack",
        "city": "Cali",
        "department": "Valle del Cauca"
      });
      resolve([result, result]);
    });
  }

  public getUnauthorizedUser(): Promise<User[]> {
    return new Promise<User[]>((resolve, reject) => {
      let result: User = new User().deserealize({
        "id": 1,
        "rol": "Citizen",
        "name": "Crack",
        "lastname": "Cracked",
        "state": "Inactivo",
        "username": "crack",
        "city": "Cali",
        "department": "Valle del Cauca"
      });
      resolve([result]);
    });
  }

  public authorizeUser(id: string, username: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      resolve(true);
    });
  }

  public enableUser(id: string, username: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      resolve(true);
    });
  }

  public disableUser(id: string, username: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      resolve(true);
    });
  }

  public updateUser(id: string, username: string, data: Object): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      resolve(true);
    });
  }
  
}
