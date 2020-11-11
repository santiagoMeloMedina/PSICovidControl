import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RoutingService } from 'src/app/service/routing/routing.service';

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


  constructor(public routing: RoutingService, 
    private formBuilder: FormBuilder) {
      this.categoryForm = this.formBuilder.group({
        name: ['',Validators.required]
      });

      this.docTypeForm = this.formBuilder.group({
        name: ['',Validators.required]
        
      });

      this.neighHoodForm = this.formBuilder.group({
        name: ['',Validators.required]
        
      });

      this.quarantineForm = this.formBuilder.group({
        days: ['',Validators.required]
      });
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

  


}
