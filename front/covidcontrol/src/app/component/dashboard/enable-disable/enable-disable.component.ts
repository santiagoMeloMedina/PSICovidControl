import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RoutingService } from 'src/app/service/routing/routing.service';
import { User } from 'src/app/model/user.model';
import { environment } from 'src/environments/environment';
import { UserService } from 'src/app/service/service/user/user.service';

@Component({
  selector: 'app-enable-disable',
  templateUrl: './enable-disable.component.html',
  styleUrls: ['./enable-disable.component.scss']
})
export class EnableDisableComponent implements OnInit {

  private searchForm: FormGroup;
  private rows: User[];
  
  constructor(public routing: RoutingService, 
              private formBuilder: FormBuilder, 
              private userService: UserService) {
    this.searchForm = this.formBuilder.group({
      search: ['',Validators.required],  
    });
  }

  ngOnInit(): void {
    this.getEnabledDisabledUsers();
  }

  public getSearchForm(): FormGroup{
    return this.searchForm;
  }

  public getCols(): string[] {
    return environment.VALUE.ENABLE_DISABLE.COLUMN;
  }

  public getRows(): User[] {
    return this.rows;
  }

  public getEnabledDisabledUsers(): void {
    this.userService.getEnabledDisabledUsers(0, 10).then(result => {
      this.rows = result;
    })
  }

  public enable(rol: string, username: string): void {
    this.userService.enableUser(rol, username).then(result => {
      if (result) {
        window.location.reload();
      }
    });
  }
  
  public disable(rol: string, username: string): void {
    this.userService.disableUser(rol, username).then(result => {
      if (result) {
        window.location.reload();
      }
    });
  }

}
