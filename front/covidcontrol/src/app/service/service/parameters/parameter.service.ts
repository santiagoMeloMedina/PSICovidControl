import { Injectable } from '@angular/core';
import { DocumentType } from 'src/app/model/parameters/document.model'
import { Neighborhood } from 'src/app/model/parameters/neighborhood.model';
import { Department } from 'src/app/model/parameters/department.model'
import { City } from 'src/app/model/parameters/city.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Response } from 'src/app/model/response.model';

@Injectable({
  providedIn: 'root'
})
export class ParameterService {

  constructor(private httpClient: HttpClient) { }

  public getDepartmentAll(): Promise<Department[]> {
    return new Promise<Department[]>((resolve, reject) => {
      let path: string = `${environment.PETITION.ENDPOINTS.PARAMETER.GET.ALL_DEPARTMENT.URL}`;
      let url: string = `${environment.PETITION.API2}${path}`;
      this.httpClient.get(url, {}).subscribe(data => {
        let response: Response = new Response(data);
        let result: Department[] = [];
        if (response.getCode() == environment.HTTP_CODES.SUCCESS) {
          response.getResponse()['content'].forEach(department => {
            result.push(new Department().deserealize(department));
          });
        }
        resolve(result);
      });
    });
  }

  public getDepartmentByCity(city: City): Promise<Department> {
    let body: Object = {"cityId": city.getId()};
    return new Promise<Department>((resolve, reject) => {
      let path: string = `${environment.PETITION.ENDPOINTS.PARAMETER.POST.DEPARTMENT_CITY.URL}`;
      let url: string = `${environment.PETITION.API2}${path}`;
      this.httpClient.post(url, body, {}).subscribe(data => {
        let response: Response = new Response(data);
        let result: Department = new Department();
        if (response.getCode() == environment.HTTP_CODES.SUCCESS) {
          result.deserealize(response.getResponse()['content'][0]);
        }
        resolve(result);
      });
    });
  }

  public getCitiesByDepartment(department: Department): Promise<City[]> {
    let body: Object = {"departmentId": department.getId()};
    return new Promise<City[]>((resolve, reject) => {
      let path: string = `${environment.PETITION.ENDPOINTS.PARAMETER.POST.CITY_DEPARTMENT.URL}`;
      let url: string = `${environment.PETITION.API2}${path}`;
      this.httpClient.post(url, body, {}).subscribe(data => {
        let response: Response = new Response(data);
        let result: City[] = [];
        if (response.getCode() == environment.HTTP_CODES.SUCCESS) {
          response.getResponse()['content'].forEach(city => {
            result.push(new City().deserealize(city));
          });
        }
        resolve(result);
      });
    });
  }

  public getDocumentTypes(): Promise<DocumentType[]> {
    return new Promise<DocumentType[]>((resolve, reject) => {
      let path: string = `${environment.PETITION.ENDPOINTS.PARAMETER.GET.ALL_DOCUMENT_TYPE.URL}`;
      let url: string = `${environment.PETITION.API2}${path}`;
      this.httpClient.get(url, {}).subscribe(data => {
        let response: Response = new Response(data);
        let result: DocumentType[] = [];
        if (response.getCode() == environment.HTTP_CODES.SUCCESS) {
          response.getResponse()['content'].forEach(type => {
            result.push(new DocumentType().deserealize(type));
          });
        }
        resolve(result);
      });
    });
  }

  public getNeighborhoodsByCity(city: City): Promise<Neighborhood[]> {
    let body: Object = {"cityId": city.getId()};
    return new Promise<Neighborhood[]>((resolve, reject) => {
      let path: string = `${environment.PETITION.ENDPOINTS.PARAMETER.POST.NEIGHBORHOOD_CITY.URL}`;
      let url: string = `${environment.PETITION.API2}${path}`;
      this.httpClient.post(url, body, {}).subscribe(data => {
        let response: Response = new Response(data);
        let result: Neighborhood[] = [];
        if (response.getCode() == environment.HTTP_CODES.SUCCESS) {
          response.getResponse()['content'].forEach(neighood => {
            result.push(new Neighborhood().deserealize(neighood));
          });
        }
        resolve(result);
      });
    });
  }

}
