import { Injectable } from '@angular/core';
import { ExamHistory } from 'src/app/model/exam-history.model';
import { Response } from 'src/app/model/response.model';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ExamService {

  constructor(private httpClient: HttpClient) { }

  public getExamHistory(start: number, limit: number): Promise<ExamHistory[]> {
    return new Promise<ExamHistory[]>((resolve, reject) => {
      let path: string = `${environment.PETITION.ENDPOINTS.EXAM.GET.ALL_HISTORY.URL(start, limit)}`;
      let url: string = `${environment.PETITION.API4}${path}`;
      this.httpClient.get(url, {}).subscribe(data => {
        let response: Response = new Response(data);
        let result: ExamHistory[] = [];
        if (response.getCode() == environment.HTTP_CODES.SUCCESS) {
          let content = response.getResponse()['content'];
          content.forEach(exam => {
            result.push(new ExamHistory().deserealize(exam));
          });
        }
        resolve(result);
      });
    });
  }

  public getExamHistoryByEs(esDocNum: number, start: number, limit: number): Promise<ExamHistory[]> {
    let body: Object = {"esDocNum": esDocNum};
    return new Promise<ExamHistory[]>((resolve, reject) => {
      let path: string = `${environment.PETITION.ENDPOINTS.EXAM.POST.ES_HISTORY.URL(start, limit)}`;
      let url: string = `${environment.PETITION.API4}${path}`;
      this.httpClient.post(url, body, {}).subscribe(data => {
        let response: Response = new Response(data);
        let result: ExamHistory[] = [];
        if (response.getCode() == environment.HTTP_CODES.SUCCESS) {
          let content = response.getResponse()['content'];
          content.forEach(exam => {
            result.push(new ExamHistory().deserealize(exam));
          });
        }
        resolve(result);
      });
    });
  }

  public getExamByCitizen(docNum: number): Promise<ExamHistory> {
    let body: Object = {"docNum": docNum};
    return new Promise<ExamHistory>((resolve, reject) => {
      let path: string = `${environment.PETITION.ENDPOINTS.EXAM.POST.CITIZEN_EXAM.URL}`;
      let url: string = `${environment.PETITION.API4}${path}`;
      this.httpClient.post(url, body, {}).subscribe(data => {
        let response: Response = new Response(data);
        let result: ExamHistory = new ExamHistory();
        if (response.getCode() == environment.HTTP_CODES.SUCCESS) {
          let content = response.getResponse()['content'];
          result.deserealize(content);
        }
        resolve(result);
      });
    });
  }

  public registerExam(data: Object): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      let path: string = `${environment.PETITION.ENDPOINTS.EXAM.POST.REGISTER.URL}`;
      let url: string = `${environment.PETITION.API4}${path}`;
      this.httpClient.post(url, data, {}).subscribe(data => {
        let response: Response = new Response(data);
        let result: boolean;
        if (response.getCode() == environment.HTTP_CODES.SUCCESS) {
          let content = response.getResponse()['content'];
          result = content;
        }
        resolve(result);
      });
    });
  }

  public updateExam(id: string, result: string): Promise<boolean> {
    let body: Object = {"_id": id, "result": result};
    return new Promise<boolean>((resolve, reject) => {
      let path: string = `${environment.PETITION.ENDPOINTS.EXAM.PUT.RESULT.URL}`;
      let url: string = `${environment.PETITION.API4}${path}`;
      this.httpClient.put(url, body, {}).subscribe(data => {
        let response: Response = new Response(data);
        let result: boolean;
        if (response.getCode() == environment.HTTP_CODES.SUCCESS) {
          let content = response.getResponse()['content'];
          result = content;
        }
        resolve(result);
      });
    });
  }
}
