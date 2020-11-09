import { Injectable } from '@angular/core';
import { DocumentType } from 'src/app/model/parameters/document.model'

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
}
