import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RoutingService } from 'src/app/service/routing/routing.service';
import { EntryService } from 'src/app/service/service/entry/entry.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.scss']
})
export class EntryComponent implements OnInit {

  private entryForm: FormGroup;

  constructor(public routing: RoutingService, 
              private formBuilder: FormBuilder, 
              private entryService: EntryService) {
      this.entryForm = this.formBuilder.group({
        docNum: ['',Validators.required], 
        temperature:['',Validators.required],
        mask: ['',Validators.required],
        date: ['',Validators.required],
        time: ['',Validators.required] 
      });
  }

  ngOnInit(): void {
  }

  public getEntryForm(): FormGroup{
    return this.entryForm;
  }

  public getResponses(): string[] {
    let result: string[] = [];
    Object.keys(environment.VALUE.ENTRY.OPTIONS).forEach(element => {
      result.push(environment.VALUE.ENTRY.OPTIONS[element]);
    });
    return result;
  }

  public registerEntry(): void {
    let values: Object = this.entryForm.value;
    this.entryForm.reset();
    this.entryService.registerEntry(values).then(result => {
      console.log(values)
    });
  }

}
