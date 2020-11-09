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
  
}
