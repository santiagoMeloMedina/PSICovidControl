import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { DashboardService } from '../dashboard/dashboard.service';

@Injectable({
  providedIn: 'root'
})
export class RoutingService {

  constructor(private router: Router, 
              private titleService: Title, 
              private dashboard: DashboardService) { }

  public setTitle(route: string): void {
    this.titleService.setTitle(environment.TITLES.TITLE[route].NAME);
    this.dashboard.setTitle(environment.TITLES.TITLE[route].NAME);
    if (environment.TITLES.TITLE[route].OTHER) {
      this.dashboard.onOther();
    } else {
      this.dashboard.offOther();
    }
  }

  public routeTo(url: string, params?: Object): void {
    let new_route: string = `${this.router.url}/${url}`;
    try {
      this.setTitle(new_route);
    } catch {}
    this.router.navigateByUrl(new_route, {});
  }

  public absoluteRoute(url: string, params?: Object): void {
    try {
      this.setTitle(`/${url}`);
    } catch {}
    this.router.navigateByUrl(`${url}`, {});
  }

}
