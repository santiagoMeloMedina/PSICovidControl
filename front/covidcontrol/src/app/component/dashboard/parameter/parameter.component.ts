import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RoutingService } from 'src/app/service/routing/routing.service';
import { environment } from 'src/environments/environment';
import { Category } from 'src/app/model/parameters/category.model';
import { Neighborhood } from 'src/app/model/parameters/neighborhood.model';
import { DocumentType } from 'src/app/model/parameters/document.model';
import { ParameterService } from 'src/app/service/service/parameters/parameter.service';
import { Department } from 'src/app/model/parameters/department.model';
import { City } from 'src/app/model/parameters/city.model';
import { NoticeService } from 'src/app/service/notice/notice.service';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-parameter',
  templateUrl: './parameter.component.html',
  styleUrls: ['./parameter.component.scss']
})
export class ParameterComponent implements OnInit {

  private categoryForm: FormGroup;
  private docTypeForm: FormGroup;
  private neighHoodForm: FormGroup;
  private quarantineForm: FormGroup;

  private types: Object[] = [];
  private type: string;

  private categories: Category[] = [];
  private documentTypes: DocumentType[] = [];
  private departments: Department[] = [];
  private department: Department = new Department();
  private cities: Map<string, City[]> = new Map();
  private city: City = new City();
  private neighborhoods: Map<string, Neighborhood[]> = new Map();

  constructor(public routing: RoutingService, 
              private formBuilder: FormBuilder, 
              private parameterService: ParameterService, 
              private noticeService: NoticeService) {
      this.categoryForm = this.formBuilder.group({
        name: ['',Validators.required]
      });

      this.docTypeForm = this.formBuilder.group({
        name: ['',Validators.required]
        
      });

      this.neighHoodForm = this.formBuilder.group({
        name: ['',Validators.required],
        cityId: ['',Validators.required]
      });

      this.quarantineForm = this.formBuilder.group({
        days: ['',Validators.required]
      });

      this.setParameterType();
  }

  ngOnInit(): void {
    this.setCategories();
    this.setDepartments();
    this.setDocumentTypes();
    this.setQuarantine();
  }

  public getCategoryForm(): FormGroup{
    return this.categoryForm;
  }

  public getDocTypeForm(): FormGroup{
    return this.docTypeForm;
  }

  public getNeighHoodForm(): FormGroup{
    return this.neighHoodForm;
  }

  public getQuarantineForm(): FormGroup{
    return this.quarantineForm;
  }

  private setParameterType(): void {
    let types: string[] = Object.keys(environment.VALUE.PARAMETER.TYPES);
    types.forEach(element => {
      this.types.push({
        NAME: environment.VALUE.PARAMETER.TYPES[element].NAME,
        ID: element
      });
    });
  }

  public getParameterType(): Object[] {
    return this.types;
  }

  public selectParameterType(id: string): void {
    this.type = environment.VALUE.PARAMETER.TYPES[id].NAME;
  }

  public isParameterTypeEqual(type: string): boolean {
    return this.type == type;
  }

  public getParameterTypeName(type: string): string {
    return environment.VALUE.PARAMETER.TYPES[type].NAME;
  }

  public getFormByParameter(): FormGroup {
    let result: FormGroup;
    switch (this.type) {
      case environment.VALUE.PARAMETER.TYPES.CATEGORY.NAME:
        result = this.categoryForm;
        break;
      case environment.VALUE.PARAMETER.TYPES.DOCUMENT.NAME:
        result = this.docTypeForm;
        break;
      case environment.VALUE.PARAMETER.TYPES.NEIGHBORHOOD.NAME:
        result = this.neighHoodForm;
        break;
    }
    return result;
  }

  public addNeighborhood(): void {
    let values: Object = this.neighHoodForm.value;
    this.neighHoodForm.reset();
    this.parameterService.addNeighborhood(new Neighborhood().deserealize(values)).then(result => {
      if (result) {
        this.noticeService.alertMessageRestart(environment.VALUE.MESSAGE.PARAMETER.NEIGHBORHOOD.ADITITION.SUCCESS);
      } else {
        this.noticeService.alertMessage(environment.VALUE.MESSAGE.PARAMETER.NEIGHBORHOOD.ADITITION.ERROR);
      }
    })
  }

  public addCategory(): void {
    let values: Object = this.categoryForm.value;
    this.categoryForm.reset();
    this.parameterService.addCategory(new Category().deserealize(values)).then(result => {
      if (result) {
        this.noticeService.alertMessageRestart(environment.VALUE.MESSAGE.PARAMETER.CATEGORY.ADITITION.SUCCESS);
      } else {
        this.noticeService.alertMessage(environment.VALUE.MESSAGE.PARAMETER.CATEGORY.ADITITION.ERROR);
      }
    })
  }

  public addDocumentType(): void {
    let values: Object = this.docTypeForm.value;
    this.docTypeForm.reset();
    this.parameterService.addDocumentType(new DocumentType().deserealize(values)).then(result => {
      if (result) {
        this.noticeService.alertMessageRestart(environment.VALUE.MESSAGE.PARAMETER.DOCUMENTTYPE.ADITITION.SUCCESS);
      } else {
        this.noticeService.alertMessage(environment.VALUE.MESSAGE.PARAMETER.DOCUMENTTYPE.ADITITION.ERROR);
      }
    })
  }

  public add(): void {
    switch (this.type) {
      case environment.VALUE.PARAMETER.TYPES.CATEGORY.NAME:
        this.addCategory();
        break;
      case environment.VALUE.PARAMETER.TYPES.DOCUMENT.NAME:
        this.addDocumentType();
        break;
      case environment.VALUE.PARAMETER.TYPES.NEIGHBORHOOD.NAME:
        this.addNeighborhood();
        break;
    }
  }

  public setQuarantine(): void {
    this.parameterService.getQuarantinePeriod().then(result => {
      this.quarantineForm.patchValue({"days": result.getDays()});
    });
  }

  public update(): void {
    let values: Object = this.quarantineForm.value;
    this.quarantineForm.reset();
    this.parameterService.updateQuarantinePeriod(values['days']).then(result => {
      if (result) {
        this.noticeService.alertMessageRestart(environment.VALUE.MESSAGE.PARAMETER.QUARANTINE.UPDATE.SUCCESS);
      } else {
        this.noticeService.alertMessage(environment.VALUE.MESSAGE.PARAMETER.QUARANTINE.UPDATE.ERROR);
      }
    })
  }

  public deleteNeighborhood(id: string): void {
    this.parameterService.deleteNeighborhood(id).then(result => {
      if (result) {
        this.noticeService.alertMessageRestart(environment.VALUE.MESSAGE.PARAMETER.NEIGHBORHOOD.DELETION.SUCCESS);
      } else {
        this.noticeService.alertMessage(environment.VALUE.MESSAGE.PARAMETER.NEIGHBORHOOD.DELETION.ERROR);
      }
    })
  }

  public deleteCategory(id: string): void {
    this.parameterService.deleteCategory(id).then(result => {
      if (result) {
        this.noticeService.alertMessageRestart(environment.VALUE.MESSAGE.PARAMETER.CATEGORY.DELETION.SUCCESS);
      } else {
        this.noticeService.alertMessage(environment.VALUE.MESSAGE.PARAMETER.CATEGORY.DELETION.ERROR);
      }
    })
  }

  public deleteDocumentType(id: string): void {
    this.parameterService.deleteDocumentType(id).then(result => {
      if (result) {
        this.noticeService.alertMessageRestart(environment.VALUE.MESSAGE.PARAMETER.DOCUMENTTYPE.DELETION.SUCCESS);
      } else {
        this.noticeService.alertMessage(environment.VALUE.MESSAGE.PARAMETER.DOCUMENTTYPE.DELETION.ERROR);
      }
    })
  }

  public delete(id: string): void {
    switch (this.type) {
      case environment.VALUE.PARAMETER.TYPES.CATEGORY.NAME:
        this.deleteCategory(id);
        break;
      case environment.VALUE.PARAMETER.TYPES.DOCUMENT.NAME:
        this.deleteDocumentType(id);
        break;
      case environment.VALUE.PARAMETER.TYPES.NEIGHBORHOOD.NAME:
        this.deleteNeighborhood(id);
        break;
    }
  }

  private setCategories(): void {
    this.parameterService.getCategories().then(result => {
      this.categories = result;
    })
  }

  public getCategories(): Category[] {
    return this.categories;
  }

  private setDepartments(): void {
    this.parameterService.getDepartmentAll().then(result => {
      this.departments = result;
    });
  }

  public getDepartments(): Department[] {
    return this.departments;
  }

  public selectDepartment(departmentId: string): void {
    let department: Department = this.departments.filter(dept => {
      return dept.getId() == departmentId;
    })[0];
    this.department = department;
    this.setCities();
  }

  private setCities(): void {
    if (typeof this.department.getId() !== "undefined" && !this.cities.has(this.department.getId())) {
      this.parameterService.getCitiesByDepartment(this.department).then(result => {
        this.cities.set(this.department.getId(), result);
      });
    }
  }

  public getCities(): City[] {
    let cities: City[] = [];
    if (this.cities.has(this.department.getId())) {
      cities = this.cities.get(this.department.getId());
    }
    return cities;
  }

  public selectCity(cityId: string): void {
    let city: City = new City();
    if (this.cities.has(this.department.getId())) {
      city = this.cities.get(this.department.getId()).filter(cit => {
        return cit.getId() == cityId;
      })[0];
    }
    this.city = city;
    this.setNeighborhoods();
  }

  private setNeighborhoods(): void {
    if (typeof this.city.getId() !== "undefined" && !this.neighborhoods.has(this.city.getId())) {
      this.parameterService.getNeighborhoodsByCity(this.city).then(result => {
        this.neighborhoods.set(this.city.getId(), result);
      })
    }
  }

  public getNeighborhoods(): Neighborhood[] {
    if (typeof this.city.getId() !== "undefined" && this.neighborhoods.has(this.city.getId())) {
      let neighborhoods: Neighborhood[] = [];
      if (this.neighborhoods.size > 0) {
        neighborhoods = this.neighborhoods.get(this.city.getId());
      }
      return neighborhoods;
    }
  }

  public setDocumentTypes(): void {
    this.parameterService.getDocumentTypes().then(result => {
      this.documentTypes = result;
    })
  }

  public getDocuments(): DocumentType[] {
    return this.documentTypes;
  }


}
