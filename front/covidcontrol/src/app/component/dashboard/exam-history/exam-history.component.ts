import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ExamHistory } from 'src/app/model/exam-history.model'
import { ExamService } from 'src/app/service/service/exam/exam.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-exam-history',
  templateUrl: './exam-history.component.html',
  styleUrls: ['./exam-history.component.scss']
})
export class ExamHistoryComponent implements OnInit {

  private rows: ExamHistory[] = [];
  private filterForm: FormGroup;

  constructor(private examService: ExamService, 
              private formBuilder: FormBuilder) {
    this.filterForm = this.formBuilder.group({
      data: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.setRows();
  }

  public getFilterForm(): FormGroup {
    return this.filterForm;
  }

  public getCols(): string[] {
    return environment.VALUE.EXAM_HISTORY.COLUMN;
  }

  public getRows(): ExamHistory[] {
    return this.rows;
  }

  public setRows(): void {
    this.examService.getExamHistory().then(result => {
      this.rows = result;
    });
  }

}
