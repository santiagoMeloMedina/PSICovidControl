import { Injectable } from '@angular/core';
import { EntryHistory } from 'src/app/model/entry-history.model';

@Injectable({
  providedIn: 'root'
})
export class EntryService {

  constructor() { }

  public getEntryHistory(): Promise<EntryHistory[]> {
    return new Promise<EntryHistory[]>((resolve, reject) => {
      let result: any = new EntryHistory().deserealize({
        "id": 1,
        "idCitizen": 1,
        "idEp": 2,
        "date": "01-07-1000",
        "time": "10:01",
        "temperature": 36,
        "mask": "SI",
        "response": "Accepted",
        "description": "Accepted"
      });
      resolve([result, result, result])
    });
  }

  public registerEntry(data: Object): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      resolve(true);
    });
  }
  
}
