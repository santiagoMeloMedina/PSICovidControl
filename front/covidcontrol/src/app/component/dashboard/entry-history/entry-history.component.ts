import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EntryService } from 'src/app/service/service/entry/entry.service';
import { EntryHistory } from 'src/app/model/entry-history.model';
import { AuthenticationService } from 'src/app/service/authentication/authentication.service';
import { User } from 'src/app/model/user.model';
import { UserService } from 'src/app/service/service/user/user.service';
import jspdf from 'jspdf';
import 'jspdf-autotable';
import { ExcelService } from 'src/app/service/excel/excel.service';

@Component({
  selector: 'app-entry-history',
  templateUrl: './entry-history.component.html',
  styleUrls: ['./entry-history.component.scss']
})
export class EntryHistoryComponent implements OnInit {

  private filterForm: FormGroup;
  private rows: EntryHistory[];
  private user: User;

  private page: number = 0;

  constructor(private entryService: EntryService, 
              private formBuilder: FormBuilder, 
              private authenticationService: AuthenticationService, 
              private userService: UserService,
              private excelService: ExcelService) {
    this.filterForm = this.formBuilder.group({
      data: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.setUser();
  }

  public setUser(): void {
    let user: Object = this.authenticationService.getUser();
    this.userService.getUser(user[environment.AUTHENTICATION.ATTR.USERNAME]).then(result => {
      this.user = result;
      this.setRowsAccordingToRole();
    })
  }

  public getFilterForm(): FormGroup {
    return this.filterForm;
  }

  public getCols(): string[] {
    return environment.VALUE.ENTRY_HISTORY.COLUMN;
  }

  public getRows(): EntryHistory[] {
    return this.rows;
  }

  public canSeeDescription(): boolean {
    let user: Object = this.authenticationService.getUser();
    let result: boolean = user[environment.AUTHENTICATION.ATTR.ROL] != environment.AUTHENTICATION.ROLES.EP;
    return result;
  }

  public setRowsAccordingToRole(): void {
    let user: Object = this.authenticationService.getUser();
    switch (user[environment.AUTHENTICATION.ATTR.ROL]) {
      case environment.AUTHENTICATION.ROLES.ADMIN:
        this.setRowsAdmin();
        break;
      case environment.AUTHENTICATION.ROLES.CITIZEN:
        this.setRowsCitizen();
        break;
      case environment.AUTHENTICATION.ROLES.EP:
        this.setRowsEp();
        break;
    }
  }

  public setRowsAdmin(): void {
    this.entryService.getEntryHistory(this.page, environment.VALUE.ENTRY.PAGE.SIZE).then(result => {
      this.rows = result;
    });
  }

  public setRowsEp(): void {
    this.entryService.getEntryHistoryByEp(this.user.getDocNum(), this.page, environment.VALUE.ENTRY.PAGE.SIZE).then(result => {
      this.rows = result;
      this.rows.forEach(row => {
        row.setDescription("");
      });
    });
  }

  public setRowsCitizen(): void {
    this.entryService.getEntryHistoryByCitizen(this.user.getDocNum(), this.page, environment.VALUE.ENTRY.PAGE.SIZE).then(result => {
      this.rows = result;
    });
  }

  public getPdfHistory(): void {
    let head = [this.getCols()];
    let data: any[][] = [];
    this.rows.forEach(row => {
      let values: any[] = [
          row.getCitizenDocNum(), row.getEpDocNum(), 
          row.getDate(), row.getTime(), 
          row.getTemperature(), row.getMask(), 
          row.getResponse(), row.getDescription()
        ]
      data.push(values);
    })
    var doc = new jspdf();
    doc.setFontSize(environment.VALUE.ENTRY_HISTORY.PDF.FONT_SIZE);
    doc.text(environment.VALUE.ENTRY_HISTORY.PDF.TITLE.NAME, 
            environment.VALUE.ENTRY_HISTORY.PDF.TITLE.X, 
            environment.VALUE.ENTRY_HISTORY.PDF.TITLE.Y);
    doc.setFontSize(environment.VALUE.ENTRY_HISTORY.PDF.FONT_SIZE);
    (doc as any).autoTable({
      head: head,
      body: data,
      theme: environment.VALUE.ENTRY_HISTORY.PDF.THEME,
    })
    doc.save(`${environment.VALUE.ENTRY_HISTORY.PDF.TITLE.NAME}.pdf`);
  }

  public getExcelHistory(): void {
    let data: Object[] = [];
    this.rows.forEach(row => {
      let values: Object = JSON.parse(JSON.stringify(row));
      delete values["epId"];
      delete values["citizenId"]
      delete values["id"]
      data.push(Object(values));
      
    });
    this.excelService.exportAsExcelFile(data, `${environment.VALUE.ENTRY_HISTORY.EXCEL.TITLE}.xlsx`)
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
    this.page += environment.VALUE.ENTRY.PAGE.SIZE;
    this.setRowsAccordingToRole();
  }

  public lastPage(): void {
    this.page -= environment.VALUE.ENTRY.PAGE.SIZE;
    if (this.page < 0) {
      this.page = 0;
    }
    this.setRowsAccordingToRole();
  }

}
