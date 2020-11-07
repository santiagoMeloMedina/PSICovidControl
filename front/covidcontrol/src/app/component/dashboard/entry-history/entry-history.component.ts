import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-entry-history',
  templateUrl: './entry-history.component.html',
  styleUrls: ['./entry-history.component.scss']
})
export class EntryHistoryComponent implements OnInit {

  constructor() { }

  
  ngOnInit(): void {
  }
  public getCols(): string []{
    return ["ID Ciudadano","ID EP","Fecha","Hora","Temperatura","Tapabocas",
  "Respuesta","Descripción"]; /*Faltan columnas */
  }

}
