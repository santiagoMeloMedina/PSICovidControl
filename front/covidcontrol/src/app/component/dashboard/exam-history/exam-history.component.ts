import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-exam-history',
  templateUrl: './exam-history.component.html',
  styleUrls: ['./exam-history.component.scss']
})
export class ExamHistoryComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  public getCols(): string[]{
    return ["ID Ciudadano","Nombres","Apellidos","Fecha","Hora","Resultado"];
  }

}
