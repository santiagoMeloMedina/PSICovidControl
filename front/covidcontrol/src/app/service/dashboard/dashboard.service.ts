import { Injectable } from '@angular/core';
import { AuthenticationService } from '../authentication/authentication.service';
import { UserService } from '../service/user/user.service';
import { User } from 'src/app/model/user.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private main: boolean = false;
  private other: boolean = false;
  private other_title: string = "";
  private profile: User = new User();

  constructor(private authenticationService: AuthenticationService, 
              private userService: UserService) {
                this.setUserName();
              }

  public getTitle(): string {
    return this.other_title;
  }

  public setTitle(title: string): void {
    this.other_title = title;
  }

  public getMain(): boolean {
    return this.main;
  }

  public getOther(): boolean {
    return this.other;
  }

  public offOther(): void {
    this.other = false;
  } 

  public onOther(): void {
    this.other = true;
  }

  public getUserName(): string {
    return this.profile.getName();
  }

  private setUserName(): void {
    let user: Object = this.authenticationService.getUser();
    this.userService.getUser(user[environment.AUTHENTICATION.ATTR.USERNAME]).then(result => {
      this.profile = result;
    });
  }
  
}
