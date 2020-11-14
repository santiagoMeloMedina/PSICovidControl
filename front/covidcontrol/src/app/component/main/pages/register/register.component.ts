import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/service/authentication/authentication.service';
import { RoutingService } from 'src/app/service/routing/routing.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  private registerForm: FormGroup;

  constructor(public routing: RoutingService, 
              public formBuilder: FormBuilder, 
              private authenticationService: AuthenticationService) {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirm_password: ['', Validators.required]
    }, {validator: environment.FUNCTION.MATCH });
  }

  ngOnInit(): void {
  }

  public getRegisterForm(): FormGroup {
    return this.registerForm;
  }

  public register(): void {
    let values: Object = this.registerForm.value;
    this.registerForm.reset();
    this.authenticationService.setRegisterData(values);
    this.routing.absoluteRoute("register-detail");
  }

}