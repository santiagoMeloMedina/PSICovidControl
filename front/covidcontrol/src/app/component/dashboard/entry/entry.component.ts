import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RoutingService } from 'src/app/service/routing/routing.service';
import { EntryService } from 'src/app/service/service/entry/entry.service';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/model/user.model';
import { UserService } from 'src/app/service/service/user/user.service';
import { AuthenticationService } from 'src/app/service/authentication/authentication.service';
import { NoticeService } from 'src/app/service/notice/notice.service';
import { ParameterService } from 'src/app/service/service/parameters/parameter.service';
import { Quarantine } from 'src/app/model/parameters/quarantine.model';
import { ExamHistory } from 'src/app/model/exam-history.model';
import { ExamService } from 'src/app/service/service/exam/exam.service';


@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.scss']
})
export class EntryComponent implements OnInit {

  private entryForm: FormGroup;
  private user: User;
  private quarantine: Quarantine;

  private registryType: string = environment.VALUE.ENTRY.REGISTRY.TYPE.AUTOMATIC;

  constructor(public routing: RoutingService, 
              private formBuilder: FormBuilder, 
              private entryService: EntryService, 
              private userService: UserService, 
              private authenticationService: AuthenticationService, 
              private noticeService: NoticeService, 
              private parameterService: ParameterService, 
              private examService: ExamService) {
      this.entryForm = this.formBuilder.group({
        citizenDocNum: ['',Validators.required], 
        temperature:['',Validators.required],
        mask: ['',Validators.required],
        date: ['',Validators.required],
        time: ['',Validators.required] 
      });
  }

  ngOnInit(): void {
    this.setUser();
    this.setQuarantine();
  }

  public setQuarantine(): void {
    this.parameterService.getQuarantinePeriod().then(result => {
      this.quarantine = result;
    })
  }

  public setUser(): void {
    this.userService.getUser(this.authenticationService.getUser()[environment.AUTHENTICATION.ATTR.USERNAME]).then(result => {
      this.user = result;
    })
  }

  public getEntryForm(): FormGroup{
    return this.entryForm;
  }

  public getAutomaticRegisterType(): string {
    return environment.VALUE.ENTRY.REGISTRY.TYPE.AUTOMATIC;
  }

  public getManualRegisterType(): string {
    return environment.VALUE.ENTRY.REGISTRY.TYPE.MANUAL;
  }

  public isManualRegistryType(): boolean {
    let result: boolean = false;
    if (this.registryType == environment.VALUE.ENTRY.REGISTRY.TYPE.MANUAL) {
      result = true;
    }
    return result;
  }

  public selectRegisterType(type: string): void {
    this.registryType = type;
  }

  public getResponses(): string[] {
    let result: string[] = [];
    Object.keys(environment.VALUE.ENTRY.OPTIONS).forEach(element => {
      result.push(environment.VALUE.ENTRY.OPTIONS[element]);
    });
    return result;
  }

  public arrangeValues(values: Object): Object {
    values['epDocNum'] = this.user.getDocNum();
    values['quarantine'] = this.quarantine.getDays();
    if (this.registryType == environment.VALUE.ENTRY.REGISTRY.TYPE.AUTOMATIC) {
      delete values['date'];
      delete values['time'];
    }
    return values;
  }

  public registerEntry(): void {
    let values: Object = JSON.parse(JSON.stringify(this.entryForm.value));
    values['exam'] = {"result": "N", "date": "2020-1-1"};
    this.examService.getExamByCitizen(values['citizenDocNum']).then(result => {
      if (typeof result['date'] !== "undefined") {
        values['exam'] = Object(result);
      }
      values = this.arrangeValues(values);
      this.entryService.registerEntry(values).then(result => {
        if (result) {
          this.noticeService.alertMessageRestart(environment.VALUE.MESSAGE.ENTRY.ADITTION.SUCCESS);
        } else {
          this.noticeService.alertMessage(environment.VALUE.MESSAGE.ENTRY.ADITTION.ERROR);
        }
      });
    });
  }

  public validForm(): boolean {
    let result = true;
    let values: Object = this.entryForm.value;
    if (this.registryType == environment.VALUE.ENTRY.REGISTRY.TYPE.AUTOMATIC) {
      let conditions: boolean[] = [
        values['citizenDocNum'] != "",
        values['temperature'] != "",
        values['mask'] != ""
      ]
      conditions.forEach(condition => {
        result = result && condition;
      });
    } else {
      result = this.entryForm.valid;
    }
    return result;
  }

}
