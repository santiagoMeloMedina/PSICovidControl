import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RoutingService } from 'src/app/service/routing/routing.service';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  private displayDropdown: boolean = false;

  constructor(public routing: RoutingService) { }

  ngOnInit(): void {
  }

  public getNav(): Object {
    return environment.MENU.NAV;
  }

  public closeDropdown(): void {
    this.displayDropdown = false;
  }

  public getDisplayDropdown(): boolean {
    return this.displayDropdown;
  }

  public toggleDisplayDropdown(): void {
    this.displayDropdown = !this.displayDropdown;
  }

  public chooseFromDropdown(title: string): void {
    this.closeDropdown();
    this.routing.absoluteRoute(title);
  }

}
