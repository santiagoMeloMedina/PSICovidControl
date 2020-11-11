import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/service/authentication/authentication.service';
import { RoutingService } from 'src/app/service/routing/routing.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-register-detail',
  templateUrl: './register-detail.component.html',
  styleUrls: ['./register-detail.component.scss']
})
export class RegisterDetailComponent implements OnInit {

  private citizenForm: FormGroup;
  private healthEnForm: FormGroup;
  private publicEsForm: FormGroup;

  private roles: Object[] = [];
  private role: string;

  constructor(public routing: RoutingService, 
              private formBuilder: FormBuilder, 
              private authenticationService: AuthenticationService) {
     
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
        city: ['',Validators.required],
        department: ['',Validators.required],
        birthdate:['',Validators.required]
    });


    this.healthEnForm = this.formBuilder.group({
      docType:['',Validators.required],
      email: ['',Validators.required],
      username: ['',Validators.required],
      docNum: ['',Validators.required],
      name: ['',Validators.required],
      totalCap:  ['',Validators.required],
      totalBeds: ['',Validators.required],
      totalResp: ['',Validators.required],
      totalDocts: ['',Validators.required],
      address: ['', Validators.required],
      phoneNum: ['', Validators.required],
      neighHood: ['', Validators.required],
      password: ['', Validators.required],
      city: ['',Validators.required],
      department: ['',Validators.required]
    });

    this.publicEsForm = this.formBuilder.group({
      docType:['',Validators.required],
      email: ['',Validators.required],
      username: ['',Validators.required],
      docNum: ['',Validators.required],
      name: ['',Validators.required],
      totalCap:  ['',Validators.required],
      address: ['', Validators.required],
      phoneNum: ['', Validators.required],
      neighHood: ['', Validators.required],
      password: ['', Validators.required],
      category: ['', Validators.required],
      city: ['',Validators.required],
      department: ['',Validators.required],
    });

    this.setRoles();
  }

  ngOnInit(): void {
  }

  private setRoles(): void {
    let types: string[] = Object.keys(environment.AUTHENTICATION.ROLES);
    types.forEach(element => {
      if (environment.AUTHENTICATION.ROLES[element] != environment.AUTHENTICATION.ROLES.ADMIN){
        this.roles.push({
          NAME: environment.AUTHENTICATION.ROLES[element],
          ID: element
        });
      }
    });
  }

  public getRoles(): Object[] {
    return this.roles;
  }

  public selectRoles(id: string): void {
    this.role = environment.AUTHENTICATION.ROLES[id];
  }

  public isRoleEqual(role: string): boolean {
    return this.role == role;
  }

  public getRoleName(role: string): string {
    return environment.AUTHENTICATION.ROLES[role];
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

  public getFormAccordingToRole(): FormGroup {
    let result: FormGroup;
    switch (this.role) {
      case environment.AUTHENTICATION.ROLES.CITIZEN:
        result = this.citizenForm;
        break;
      case environment.AUTHENTICATION.ROLES.EP:
        result = this.publicEsForm;
        break;
      case environment.AUTHENTICATION.ROLES.ES:
        result = this.healthEnForm;
        break;
      default:
        result = this.citizenForm;
        break;
    }
    return result;
  }

  public register(): void {
    let form: FormGroup = this.getFormAccordingToRole();
    let values: Object = form.value;
    form.reset();
    this.authenticationService.register(values).then(result => {
      console.log(values);
    });
  }

}
