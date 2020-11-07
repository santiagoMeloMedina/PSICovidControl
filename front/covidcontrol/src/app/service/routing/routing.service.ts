import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RoutingService {

  constructor(private router: Router) { }

  public routeTo(url: string, params?: Object): void {
    this.router.navigateByUrl(`${this.router.url}/${url}`, {});
  }

  public absoluteRoute(url: string, params?: Object): void {
    this.router.navigateByUrl(`${url}`, {});
  }

}
