import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RoutingService } from 'src/app/service/routing/routing.service';
import { environment } from 'src/environments/environment';

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


  constructor(public routing: RoutingService, 
    private formBuilder: FormBuilder) {
      this.categoryForm = this.formBuilder.group({
        name: ['',Validators.required]
      });

      this.docTypeForm = this.formBuilder.group({
        name: ['',Validators.required]
        
      });

      this.neighHoodForm = this.formBuilder.group({
        name: ['',Validators.required],
        city: ['',Validators.required]
      });

      this.quarantineForm = this.formBuilder.group({
        days: ['',Validators.required]
      });

      this.setParameterType();
  }

  ngOnInit(): void {
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

  public add(): void {
    let form: FormGroup = this.getFormByParameter();
    let values: Object = form.value;
    form.reset();
    console.log(values);
    // this.authenticationService.register(values).then(result => {
    //   console.log(values);
    // });
  }

  public update(): void {
    let form: FormGroup = this.getFormByParameter();
    let values: Object = form.value;
    form.reset();
    console.log(values);
  }

  public getCategories(): Object[] {
    return [{name: "Cine"}]
  }

  public getNeighborhoods(): Object[] {
    return [{name: "Ciudad Jardin"}]
  }

  public getDocuments(): Object[] {
    return [{name: "Cedula"}]
  }


}
