import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RoutingService } from 'src/app/service/routing/routing.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.scss']
})
export class ExamComponent implements OnInit {
  private examForm: FormGroup;

  constructor(public routing: RoutingService, 
    private formBuilder: FormBuilder) {
      this.examForm = this.formBuilder.group({
        names: ['',Validators.required], 
        lastNames:['',Validators.required],
        docType: ['',Validators.required],
        docNum: ['',Validators.required],
        dateEn: ['',Validators.required],
        timeEn:['',Validators.required]
      });
  }

  ngOnInit(): void {
  }

  public getExamForm(): FormGroup{
    return this.examForm;
  }


}
