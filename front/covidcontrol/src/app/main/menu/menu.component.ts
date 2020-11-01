import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  private displayDropdown: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  public getDisplayDropdown(): boolean {
    return this.displayDropdown;
  }

  public toggleDisplayDropdown(): void {
    this.displayDropdown = !this.displayDropdown;
  }

}
