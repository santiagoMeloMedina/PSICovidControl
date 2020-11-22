import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NoticeService {

  constructor() { }

  public alertMessageRestart(msg: string): void {
    alert(msg);
    setTimeout(() => {
      window.location.reload();
    }, environment.VALUE.NOTICE.TIME);
  }

  public alertMessage(msg: string): void {
    alert(msg);
  }
}
