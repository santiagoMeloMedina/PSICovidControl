import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.scss']
})
export class ExamComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  public getCols(): string[]{
    return ["ID Ciudadano","Nombres","Apellidos","Fecha","Hora","Resultado"];
  }

}