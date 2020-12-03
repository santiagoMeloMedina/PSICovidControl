import { Component, OnInit } from '@angular/core';
import { RoutingService } from 'src/app/service/routing/routing.service';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from 'src/app/service/authentication/authentication.service';

@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.scss']
})
export class ActionComponent implements OnInit {

  constructor(public routing: RoutingService, 
              public authenticationService: AuthenticationService) { }

  ngOnInit(): void {
  }

  public getActions(): Object[] {
    let user: Object = this.authenticationService.getUser();
    if (user != null) {
      let rol: string = user[environment.AUTHENTICATION.ATTR.ROL];
      return environment.ACTION.ACTIONS.filter(functionality => {
        return functionality.roles.includes(rol);
      });
    } else {
      return [];
    }
  }

}
