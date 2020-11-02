import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RoutingService } from 'src/app/service/routing/routing.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  private contactForm: FormGroup;

  constructor(public routing: RoutingService, 
              private formBuilder: FormBuilder) {
    this.contactForm = this.formBuilder.group({
      email: ['', Validators.required],
      subject: ['', Validators.required],
      text: ['', Validators.required]
    });
  }
 ngOnInit(): void {
  }

  public getContactForm(): FormGroup {
    return this.contactForm;
  }

}
