import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ExamHistory } from 'src/app/model/exam-history.model'
import { ExamService } from 'src/app/service/service/exam/exam.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ES } from 'src/app/model/es.model';
import { UserService } from 'src/app/service/service/user/user.service';
import { AuthenticationService } from 'src/app/service/authentication/authentication.service';
import { User } from 'src/app/model/user.model';
import jspdf from 'jspdf';
import 'jspdf-autotable';
import { ExcelService } from 'src/app/service/excel/excel.service';
import { NoticeService } from 'src/app/service/notice/notice.service';

@Component({
  selector: 'app-exam-history',
  templateUrl: './exam-history.component.html',
  styleUrls: ['./exam-history.component.scss']
})
export class ExamHistoryComponent implements OnInit {

  private rows: ExamHistory[] = [];
  private filterForm: FormGroup;
  private user: User = new User();

  private page: number = 0;

  constructor(private examService: ExamService, 
              private formBuilder: FormBuilder, 
              private userService: UserService,
              private authenticationService: AuthenticationService,
              private excelService: ExcelService, 
              private noticeService: NoticeService) {
    this.filterForm = this.formBuilder.group({
      data: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.setUser();
  }

  public setUser(): void {
    let user = this.authenticationService.getUser();
    this.userService.getUser(user[environment.AUTHENTICATION.ATTR.USERNAME]).then(result => {
      this.user = result;
      this.setRowsAccordingToRole();
    })
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

  public setRowsEs(): void {
    this.examService.getExamHistoryByEs(this.user.getDocNum(), this.page, environment.VALUE.EXAM.PAGE.SIZE).then(result => {
      this.rows = result;
    });
  }

  public setRowsAdmin(): void {
    this.examService.getExamHistory(this.page, environment.VALUE.EXAM.PAGE.SIZE).then(result => {
      this.rows = result;
    });
  }

  public setRowsAccordingToRole(): void {
    let user: Object = this.authenticationService.getUser();
    switch (user[environment.AUTHENTICATION.ATTR.ROL]) {
      case environment.AUTHENTICATION.ROLES.ADMIN:
        this.setRowsAdmin();
        break;
      case environment.AUTHENTICATION.ROLES.ES:
        this.setRowsEs();
        break;
    }
  }

  public updateExamResult(id: string, result: string): void {
    this.examService.updateExam(id, result).then(info => {
      if (info) {
        this.noticeService.alertMessageRestart(environment.VALUE.MESSAGE.EXAM.UPDATE.SUCCESS);
      } else {
        this.noticeService.alertMessage(environment.VALUE.MESSAGE.EXAM.UPDATE.ERROR);
      }
    })
  }

  public getPdfHistory(): void {
    let head = [this.getCols()];
    let data: any[][] = [];
    this.rows.forEach(row => {
      let values: any[] = [
          row.getCitizenDocNum(), 
          row.getName(),
          row.getDate(),
          row.getTime(),
          row.getResult()
        ]
      data.push(values);
    })
    var doc = new jspdf();
    doc.setFontSize(environment.VALUE.EXAM_HISTORY.PDF.FONT_SIZE);
    doc.text(environment.VALUE.EXAM_HISTORY.PDF.TITLE.NAME, 
            environment.VALUE.EXAM_HISTORY.PDF.TITLE.X, 
            environment.VALUE.EXAM_HISTORY.PDF.TITLE.Y);
    doc.setFontSize(environment.VALUE.EXAM_HISTORY.PDF.FONT_SIZE);
    (doc as any).autoTable({
      head: head,
      body: data,
      theme: environment.VALUE.EXAM_HISTORY.PDF.THEME,
    })
    doc.save(`${environment.VALUE.EXAM_HISTORY.PDF.TITLE.NAME}.pdf`);
  }

  public getExcelHistory(): void {
    let data: Object[] = [];
    this.rows.forEach(row => {
      let values: Object = JSON.parse(JSON.stringify(row));
      values["result"] = row.getResult();
      delete values["esDocNum"];
      delete values["id"];
      data.push(Object(values));
      
    });
    this.excelService.exportAsExcelFile(data, `${environment.VALUE.EXAM_HISTORY.EXCEL.TITLE}.xlsx`)
  }

  public canNextPage(): boolean {
    let result = true;
    if (typeof this.rows !== "undefined" && this.rows.length < environment.VALUE.ENTRY.PAGE.SIZE) {
      result = false;
    }
    return result;
  }

  public canLastPage(): boolean {
    let result = true;
    if (this.page == 0) {
      result = false;
    }
    return result;
  }

  public nextPage(): void {
    this.page += environment.VALUE.EXAM.PAGE.SIZE;
    this.setRowsAccordingToRole();
  }

  public lastPage(): void {
    this.page -= environment.VALUE.EXAM.PAGE.SIZE;
    if (this.page < 0) {
      this.page = 0;
    }
    this.setRowsAccordingToRole();
  }

}
