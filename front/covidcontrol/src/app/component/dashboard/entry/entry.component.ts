import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.scss']
})
export class EntryComponent implements OnInit {

  constructor() { }

  
  ngOnInit(): void {
  }
  public getCols(): string []{
    return ["ID Ciudadano","ID EP","Fecha","Hora","Temperatura","Tapabocas",
  "Respuesta","Descripción"];
  }

}
