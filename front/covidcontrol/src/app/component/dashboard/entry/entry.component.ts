import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RoutingService } from 'src/app/service/routing/routing.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.scss']
})
export class EntryComponent implements OnInit {

  private entryForm: FormGroup;

  constructor(public routing: RoutingService, 
    private formBuilder: FormBuilder) {
  this.entryForm = this.formBuilder.group({
  docNum: ['',Validators.required], 
  temperature:['',Validators.required],
  maskUse: ['',Validators.required],
  fecha: ['',Validators.required],
  hora: ['',Validators.required] 
  });
  }

  ngOnInit(): void {
  }

  public getEntryForm(): FormGroup{
    return this.entryForm;
  }

 

}
