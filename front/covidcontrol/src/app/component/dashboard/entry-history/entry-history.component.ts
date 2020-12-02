import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EntryService } from 'src/app/service/service/entry/entry.service';
import { EntryHistory } from 'src/app/model/entry-history.model';
import { AuthenticationService } from 'src/app/service/authentication/authentication.service';
import { User } from 'src/app/model/user.model';
import { UserService } from 'src/app/service/service/user/user.service';

@Component({
  selector: 'app-entry-history',
  templateUrl: './entry-history.component.html',
  styleUrls: ['./entry-history.component.scss']
})
export class EntryHistoryComponent implements OnInit {

  private filterForm: FormGroup;
  private rows: EntryHistory[];
  private user: User;

  constructor(private entryService: EntryService, 
              private formBuilder: FormBuilder, 
              private authenticationService: AuthenticationService, 
              private userService: UserService) {
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

  public setRowsAccordingToRole(): FormGroup {
    let form: FormGroup;
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
    return form;
  }

  public setRowsAdmin(): void {
    this.entryService.getEntryHistory(0, 10).then(result => {
      this.rows = result;
    });
  }

  public setRowsEp(): void {
    this.entryService.getEntryHistoryByEp(this.user.getDocNum(), 0, 100).then(result => {
      this.rows = result;
    });
  }

  public setRowsCitizen(): void {
    console.log(this.user.getDocNum())
    this.entryService.getEntryHistoryByCitizen(this.user.getDocNum(), 0, 100).then(result => {
      this.rows = result;
    });
  }

}
