import { Component, OnInit } from '@angular/core';
import { RoutingService } from 'src/app/service/routing/routing.service';
import { DashboardService } from 'src/app/service/dashboard/dashboard.service';
import { Title } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/service/authentication/authentication.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  private userMenu: boolean = false;

  constructor(public routing: RoutingService, 
              public dashboard: DashboardService,
              private router: Router, 
              private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.routing.setTitle(this.router.url);
  }

  public getUserMenu(): boolean {
    return this.userMenu;
  }

  public toggleUserMenu(): void {
    this.userMenu = !this.userMenu;
  }

  public logOut(): void {
    this.authenticationService.logOut();
    window.location.reload();
  }

}
