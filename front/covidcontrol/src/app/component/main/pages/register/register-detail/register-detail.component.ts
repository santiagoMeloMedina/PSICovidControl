import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RoutingService } from 'src/app/service/routing/routing.service';


@Component({
  selector: 'app-register-detail',
  templateUrl: './register-detail.component.html',
  styleUrls: ['./register-detail.component.scss']
})
export class RegisterDetailComponent implements OnInit {

  private citizenForm: FormGroup;
  private healthEnForm: FormGroup;
  private publicEsForm: FormGroup;

  constructor(public routing: RoutingService, 
    private formBuilder: FormBuilder) {
     
      this.citizenForm = this.formBuilder.group({
        docType:['',Validators.required],
        email: ['',Validators.required],
        username: ['',Validators.required],
        docNum: ['',Validators.required],
        names: ['',Validators.required], 
        gender: ['',Validators.required], 
        lastNames: ['', Validators.required],
        address: ['', Validators.required],
        phoneNum: ['', Validators.required],
        neighHood: ['', Validators.required],
        password: ['', Validators.required],
        munic: ['',Validators.required],
        department: ['',Validators.required],
        birthdate:['',Validators.required]
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
