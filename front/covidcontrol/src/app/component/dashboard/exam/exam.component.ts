import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RoutingService } from 'src/app/service/routing/routing.service';
import { ExamService } from 'src/app/service/service/exam/exam.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.scss']
})
export class ExamComponent implements OnInit {

  private examForm: FormGroup;

  constructor(public routing: RoutingService, 
              private formBuilder: FormBuilder, 
              private examService: ExamService) {
      this.examForm = this.formBuilder.group({
        name: ['',Validators.required], 
        lastname:['',Validators.required],
        docType: ['',Validators.required],
        docNum: ['',Validators.required],
        date: ['',Validators.required],
        time:['',Validators.required]
      });
  }

  ngOnInit(): void {
  }

  public getExamForm(): FormGroup{
    return this.examForm;
  }

  public getResponses(): string[] {
    let result: string[] = [];
    Object.keys(environment.VALUE.ENTRY.OPTIONS).forEach(element => {
      result.push(environment.VALUE.ENTRY.OPTIONS[element]);
    });
    return result;
  }

  public registerExam(): void {
    let values: Object = this.examForm.value;
    this.examForm.reset();
    this.examService.registerExam(values).then(result => {
      console.log(values)
    });
  }

}
