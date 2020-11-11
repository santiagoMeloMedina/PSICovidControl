import { Injectable } from '@angular/core';
import { ExamHistory } from 'src/app/model/exam-history.model';

@Injectable({
  providedIn: 'root'
})
export class ExamService {

  constructor() { }

  public getExamHistory(): Promise<ExamHistory[]> {
    return new Promise<ExamHistory[]>((resolve, reject) => {
      let result: any = new ExamHistory().deserealize({
        "id": 1,
        "idCitizen": 1,
        "name": "Crack",
        "lastname": "Cracked",
        "date": "01-07-1000",
        "time": "10:01",
        "result": "Negative"
      });
      resolve([result, result, result])
    });
  }
}
