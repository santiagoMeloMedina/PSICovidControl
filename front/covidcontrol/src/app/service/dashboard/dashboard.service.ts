import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private main: boolean = false;
  private other: boolean = false;
  private other_title: string = "";

  constructor() { }

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
  
}
