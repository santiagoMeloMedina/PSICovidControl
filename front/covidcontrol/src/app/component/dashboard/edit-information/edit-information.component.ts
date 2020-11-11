import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RoutingService } from 'src/app/service/routing/routing.service';
import { AuthenticationService } from 'src/app/service/authentication/authentication.service';
import { environment } from 'src/environments/environment';
import { Neighborhood } from 'src/app/model/neighborhood.model';
import { UserService } from 'src/app/service/service/user/user.service';
import { ParameterService } from 'src/app/service/service/parameters/parameter.service';


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
  
  constructor(public routing: RoutingService, 
              private formBuilder: FormBuilder,
              public authenticationService: AuthenticationService, 
              private userService: UserService, 
              private parameterService: ParameterService) {
      this.adminForm = this.formBuilder.group({
          name: ['',Validators.required],  
          lastname: ['', Validators.required],
          password: ['', Validators.required]
      });

      this.citizenForm = this.formBuilder.group({
        name: ['',Validators.required],  
        lastname: ['', Validators.required],
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
    this.setNeighborhood();
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
    let user: Object = this.authenticationService.getUser();
    let values: Object = form.value;
    form.reset();
    let id: string = user[environment.AUTHENTICATION.ATTR.ID];
    let username: string = user[environment.AUTHENTICATION.ATTR.USERNAME];
    this.userService.updateUser(id, username, values).then(result => {
      console.log(values)
      console.log(`Updated ${id} - ${username}`)
    });
  }
  
}
