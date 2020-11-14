import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/service/authentication/authentication.service';
import { RoutingService } from 'src/app/service/routing/routing.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private loginForm: FormGroup;

  constructor(public routing: RoutingService, 
              private formBuilder: FormBuilder, 
              private authenticateService: AuthenticationService) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  public getLoginForm(): FormGroup {
    return this.loginForm;
  }

  public authenticate(): void {
    let values: Object = this.loginForm.value;
    this.loginForm.reset();
    this.authenticateService.authenticate(values['username'], values['password']).then(result => {
      if (result) {
        window.location.reload();
      }
    });
  }

}
