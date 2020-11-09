import { Injectable } from '@angular/core';
import { DocumentType } from 'src/app/model/parameters/document.model'
import { Neighborhood } from 'src/app/model/neighborhood.model';

@Injectable({
  providedIn: 'root'
})
export class ParameterService {

  constructor() { }

  public getDocumentTypes(): Promise<DocumentType[]> {
    return new Promise<DocumentType[]>((resolve, reject) => {
      let result: DocumentType = new DocumentType().deserealize({
        "id": 1,
        "name": "Cedula de Ciudadania"
      });
      resolve([result, result]);
    });
  }

  public getNeighborhoods(): Promise<Neighborhood[]> {
    return new Promise<Neighborhood[]>((resolve, reject) => {
      let result: Neighborhood = new Neighborhood().deserealize({
        "id": 1,
        "name": "Ciudad Jardin"
      });
      resolve([result, result]);
    });
  }


}
