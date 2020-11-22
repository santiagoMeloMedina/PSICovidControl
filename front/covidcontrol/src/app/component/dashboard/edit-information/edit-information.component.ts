import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RoutingService } from 'src/app/service/routing/routing.service';
import { AuthenticationService } from 'src/app/service/authentication/authentication.service';
import { environment } from 'src/environments/environment';
import { Neighborhood } from 'src/app/model/neighborhood.model';
import { UserService } from 'src/app/service/service/user/user.service';
import { ParameterService } from 'src/app/service/service/parameters/parameter.service';
import { Citizen } from 'src/app/model/citizen.model';
import { Admin } from 'src/app/model/admin.model';
import { EP } from 'src/app/model/ep.model';
import { ES } from 'src/app/model/es.model';
import { User } from 'src/app/model/user.model';

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
  private neighborhoods: Neighborhood[] = [];

  private user: User | Citizen | Admin | EP | ES = new User();
  
  constructor(public routing: RoutingService, 
              private formBuilder: FormBuilder,
              public authenticationService: AuthenticationService, 
              private userService: UserService, 
              private parameterService: ParameterService) {
      this.adminForm = this.formBuilder.group({
          name: ['',Validators.required],  
          lastname: ['', Validators.required]
      });

      this.citizenForm = this.formBuilder.group({
        name: ['',Validators.required],  
        lastname: ['', Validators.required],
        address: ['', Validators.required],
        phoneNum: ['', Validators.required],
        neighHood: ['', Validators.required],
        gender: ['', Validators.required],
        department: ['', Validators.required],
        city: ['', Validators.required]
    });

    this.healthEnForm = this.formBuilder.group({
      name: ['',Validators.required],  
      address: ['', Validators.required],
      phoneNum: ['', Validators.required],
      neighHood: ['', Validators.required],
      department: ['', Validators.required], 
      city: ['', Validators.required],
      totalCap: ['', Validators.required],
      totalRes: ['', Validators.required],
      totalDocts: ['', Validators.required],
      totalBeds: ['', Validators.required]
    });

    this.publicEsForm = this.formBuilder.group({
      name: ['',Validators.required],  
      address: ['', Validators.required],
      phoneNum: ['', Validators.required],
      neighHood: ['', Validators.required],
      category: ['', Validators.required],
      totalCap: ['', Validators.required],
      department: ['', Validators.required], 
      city: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.setNeighborhood();
    this.setUserInfo();
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

  public sameRole(role: string): boolean {
    let user_role: string = this.authenticationService.getUser()[environment.AUTHENTICATION.ATTR.ROL];
    return user_role == role;
  }

  public getRoleName(role: string): string {
    return environment.AUTHENTICATION.ROLES[role];
  }

  public getFormAccordingToRole(): FormGroup {
    let form: FormGroup;
    let user: Object = this.authenticationService.getUser();
    switch (user[environment.AUTHENTICATION.ATTR.ROL]) {
      case environment.AUTHENTICATION.ROLES.ADMIN:
        form = this.adminForm;
        break;
      case environment.AUTHENTICATION.ROLES.CITIZEN:
        form = this.citizenForm;
        break;
      case environment.AUTHENTICATION.ROLES.ES:
        form = this.healthEnForm;
        break;
      case environment.AUTHENTICATION.ROLES.EP:
        form = this.publicEsForm;
        break;
    }
    return form;
  }

  public getUserGetFunctionByRole(username: string): any {
    let result: any;
    let user: Object = this.authenticationService.getUser();
    switch (user[environment.AUTHENTICATION.ATTR.ROL]) {
      case environment.AUTHENTICATION.ROLES.ADMIN:
        result = this.userService.getAdmin(username);
        break;
      case environment.AUTHENTICATION.ROLES.CITIZEN:
        result = this.userService.getCitizen(username);
        break;
      case environment.AUTHENTICATION.ROLES.ES:
        result = this.userService.getES(username);
        break;
      case environment.AUTHENTICATION.ROLES.EP:
        result = this.userService.getEP(username);
        break;
    }
    return result;
  }

  public patchAdminValues(): void {
    let admin: Admin = new Admin().deserealize(Object(this.user));
    this.adminForm.patchValue({
      "name": admin.getName(),
      "lastname": admin.getLastname()
    });
  }

  public patchCitizenValues(): void {
    let citizen: Citizen = new Citizen().deserealize(Object(this.user));
    this.citizenForm.patchValue({
      "name": citizen.getName(),  
      "lastname": citizen.getLastname(),
      "address": citizen.getAddress(),
      "phoneNum": citizen.getPhone(),
      "neighHood": citizen.getNeighborhood(),
      "gender": citizen.getGender(),
      "department": citizen.getDepartment(),
      "city": citizen.getCity()
    });
  }

  public patchEPValues(): void {
    let ep: EP = new EP().deserealize(Object(this.user));
    this.publicEsForm.patchValue({
      "name": ep.getName(),
      "address": ep.getAddress(),
      "phoneNum": ep.getPhone(),
      "neighHood": ep.getNeighborhood(),
      "category": ep.getCategory(),
      "totalCap": ep.getTotalCap(),
      "department": ep.getDepartment(),
      "city": ep.getCity()
    });
  }

  public patchESValues(): void {
    let es: ES = new ES().deserealize(Object(this.user));
    this.healthEnForm.patchValue({
      "name": es.getName(),
      "address": es.getAddress(),
      "phoneNum": es.getPhone(),
      "neighHood": es.getNeighborhood(),
      "department": es.getDepartment(),
      "city": es.getCity(),
      "totalCap": es.getTotalCap(),
      "totalRes": es.getTotalRes(),
      "totalDocts": es.getTotalDocts(),
      "totalBeds": es.getTotalBeds()
    });
  }

  public setFormValues(): void {
    this.patchAdminValues();
    this.patchCitizenValues();
    this.patchEPValues();
    this.patchESValues();
  }

  public setUserInfo(): void {
    let user: Object = this.authenticationService.getUser();
    let username: string = user[environment.AUTHENTICATION.ATTR.USERNAME];
    this.getUserGetFunctionByRole(username).then(result => {
      this.user = result;
      this.setFormValues();
    });
  }

  public getUser(): User | Citizen | Admin | EP | ES {
    return this.user;
  }

  public getNeighborhood(): Neighborhood[] {
    return this.neighborhoods;
  }

  public setNeighborhood(): void {
    this.parameterService.getNeighborhoods().then(result => {
      this.neighborhoods = result;
    })
  }

  public update(): void {
    let form: FormGroup = this.getFormAccordingToRole();
    let values: Object = form.value;
    Object.keys(values).forEach(key => {
      this.user[key] = values[key];
    });
    this.userService.updateUser(Object(this.user)).then(result => {
      if (result) {
        window.location.reload();
      }
    });
  }
  
}
