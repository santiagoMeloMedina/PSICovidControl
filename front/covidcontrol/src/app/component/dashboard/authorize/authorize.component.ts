import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RoutingService } from 'src/app/service/routing/routing.service';


@Component({
  selector: 'app-authorize',
  templateUrl: './authorize.component.html',
  styleUrls: ['./authorize.component.scss']
})
export class AuthorizeComponent implements OnInit {

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
    return ["ID","Tipo de cuenta","Nombre","Estado","Nombre usuario","Municipio","Departamento"];
  }

}
