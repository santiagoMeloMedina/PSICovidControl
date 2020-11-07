import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RoutingService } from 'src/app/service/routing/routing.service';


@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {
  private adminForm: FormGroup;

  constructor(public routing: RoutingService, 
    private formBuilder: FormBuilder) {
  this.adminForm = this.formBuilder.group({
  username: ['',Validators.required],  
  password: ['', Validators.required],
  docType: ['', Validators.required],
  docNum:['', Validators.required],
  names:['', Validators.required],
  lastNames:['', Validators.required]
  });
  }

  

  ngOnInit(): void {
  }


  public getAdminForm(): FormGroup {
    return this.adminForm;
  }

}
