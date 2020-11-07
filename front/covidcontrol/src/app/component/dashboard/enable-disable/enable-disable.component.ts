import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RoutingService } from 'src/app/service/routing/routing.service';

@Component({
  selector: 'app-enable-disable',
  templateUrl: './enable-disable.component.html',
  styleUrls: ['./enable-disable.component.scss']
})
export class EnableDisableComponent implements OnInit {
  private searchForm: FormGroup;

  
  constructor(public routing: RoutingService, 
    private formBuilder: FormBuilder) {
  this.searchForm = this.formBuilder.group({
  search: ['',Validators.required],  
  });
  }

  ngOnInit(): void {
  }

  public getSearchForm(): FormGroup{
    return this.searchForm;
  }

  public getCols(): string []{
    return ["ID","Tipo de cuenta","Nombre","Apellidos","Estado","Nombre usuario","Municipio","Departamento"];
  }

}
