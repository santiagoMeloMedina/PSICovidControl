import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { RoutingService } from 'src/app/service/routing/routing.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  private registerForm: FormGroup;

  constructor(public routing: RoutingService) {
    this.registerForm = new FormGroup({
      username: new FormControl(),
      password: new FormControl(),
      confirm_password: new FormControl()
    });
  }

  ngOnInit(): void {
  }

  public getLoginForm(): FormGroup {
    return this.registerForm;
  }

}