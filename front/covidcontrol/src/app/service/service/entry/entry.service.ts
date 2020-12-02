import { Injectable } from '@angular/core';
import { EntryHistory } from 'src/app/model/entry-history.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Response } from 'src/app/model/response.model';

@Injectable({
  providedIn: 'root'
})
export class EntryService {

  constructor(private httpClient: HttpClient) { }

  public getEntryHistory(start: number, limit: number): Promise<EntryHistory[]> {
    return new Promise<EntryHistory[]>((resolve, reject) => {
      let path: string = `${environment.PETITION.ENDPOINTS.PARAMETER.GET.ENTRY.ALL.URL(start, limit)}`;
      let url: string = `${environment.PETITION.API3}${path}`;
      this.httpClient.post(url, {}, {}).subscribe(data => {
        let response: Response = new Response(data);
        let result: EntryHistory[] = [];
        if (response.getCode() == environment.HTTP_CODES.SUCCESS) {
          let content = response.getResponse()['content'];
          content.forEach(entry => {
            result.push(new EntryHistory().deserealize(entry));
          });
        }
        resolve(result);
      });
    });
  }

  public getEntryHistoryByEp(docNum: number, start: number, limit: number): Promise<EntryHistory[]> {
    let body: Object = {"docNum": docNum};
    return new Promise<EntryHistory[]>((resolve, reject) => {
      let path: string = `${environment.PETITION.ENDPOINTS.PARAMETER.GET.ENTRY.EP.URL(start, limit)}`;
      let url: string = `${environment.PETITION.API3}${path}`;
      this.httpClient.post(url, body, {}).subscribe(data => {
        let response: Response = new Response(data);
        let result: EntryHistory[] = [];
        if (response.getCode() == environment.HTTP_CODES.SUCCESS) {
          let content = response.getResponse()['content'];
          content.forEach(entry => {
            result.push(new EntryHistory().deserealize(entry));
          });
        }
        resolve(result);
      });
    });
  }

  public getEntryHistoryByCitizen(docNum: number, start: number, limit: number): Promise<EntryHistory[]> {
    let body: Object = {"docNum": docNum};
    return new Promise<EntryHistory[]>((resolve, reject) => {
      let path: string = `${environment.PETITION.ENDPOINTS.PARAMETER.GET.ENTRY.CITIZEN.URL(start, limit)}`;
      let url: string = `${environment.PETITION.API3}${path}`;
      this.httpClient.post(url, body, {}).subscribe(data => {
        let response: Response = new Response(data);
        let result: EntryHistory[] = [];
        if (response.getCode() == environment.HTTP_CODES.SUCCESS) {
          let content = response.getResponse()['content'];
          content.forEach(entry => {
            result.push(new EntryHistory().deserealize(entry));
          });
        }
        resolve(result);
      });
    });
  }

  public registerEntry(data: Object): Promise<EntryHistory> {
    return new Promise<EntryHistory>((resolve, reject) => {
      let path: string = `${environment.PETITION.ENDPOINTS.ENTRY.POST.ADD.URL}`;
      let url: string = `${environment.PETITION.API3}${path}`;
      this.httpClient.post(url, data, {}).subscribe(data => {
        let response: Response = new Response(data);
        let result: EntryHistory = null;
        if (response.getCode() == environment.HTTP_CODES.SUCCESS) {
          let content = response.getResponse()['content'];
          result = new EntryHistory().deserealize(content);
        }
        resolve(result);
      });
    });
  }
  
}
