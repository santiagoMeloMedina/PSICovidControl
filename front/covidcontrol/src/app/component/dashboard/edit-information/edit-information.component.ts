import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RoutingService } from 'src/app/service/routing/routing.service';


@Component({
  selector: 'app-edit-information',
  templateUrl: './edit-information.component.html',
  styleUrls: ['./edit-information.component.scss']
})
export class EditInformationComponent implements OnInit {
  private adminForm: FormGroup;
  private citizenForm: FormGroup;
  private healthEnForm: FormGroup;
  private publicEsForm: FormGroup;
  
  constructor(public routing: RoutingService, 
    private formBuilder: FormBuilder) {
      this.adminForm = this.formBuilder.group({
          names: ['',Validators.required],  
          lastNames: ['', Validators.required],
          password: ['', Validators.required]
      });

      this.citizenForm = this.formBuilder.group({
        names: ['',Validators.required],  
        lastNames: ['', Validators.required],
        address: ['', Validators.required],
        phoneNum: ['', Validators.required],
        neighHood: ['', Validators.required],
        password: ['', Validators.required]
    });


    this.healthEnForm = this.formBuilder.group({
      name: ['',Validators.required],  
      address: ['', Validators.required],
      phoneNum: ['', Validators.required],
      neighHood: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.publicEsForm = this.formBuilder.group({
      name: ['',Validators.required],  
      address: ['', Validators.required],
      phoneNum: ['', Validators.required],
      neighHood: ['', Validators.required],
      password: ['', Validators.required],
      category: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }


  
  public getAdminForm(): FormGroup {
    return this.adminForm;
  }
  public getCitizenForm(): FormGroup {
    return this.citizenForm;
  }

  public getHealthEnForm(): FormGroup{
    return this.healthEnForm;
  }

  public getPublicEsForm(): FormGroup{
    return this.publicEsForm;
  }



}
