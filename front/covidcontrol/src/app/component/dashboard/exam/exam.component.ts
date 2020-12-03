import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RoutingService } from 'src/app/service/routing/routing.service';
import { ExamService } from 'src/app/service/service/exam/exam.service';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/model/user.model';
import { UserService } from 'src/app/service/service/user/user.service';
import { AuthenticationService } from 'src/app/service/authentication/authentication.service';
import { ParameterService } from 'src/app/service/service/parameters/parameter.service';
import { DocumentType } from 'src/app/model/parameters/document.model';
import { NoticeService } from 'src/app/service/notice/notice.service';


@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.scss']
})
export class ExamComponent implements OnInit {

  private examForm: FormGroup;
  private user: User = new User();

  private documentTypes: DocumentType[] = [];

  constructor(public routing: RoutingService, 
              private formBuilder: FormBuilder, 
              private examService: ExamService,
              private userService: UserService,
              private authenticationService: AuthenticationService, 
              private parameterService: ParameterService, 
              private noticeService: NoticeService) {
      this.examForm = this.formBuilder.group({
        name: ['',Validators.required], 
        lastname:['',Validators.required],
        docType: ['',Validators.required],
        citizenDocNum: ['',Validators.required],
        date: ['',Validators.required],
        time:['',Validators.required],
        result:['',Validators.required]
      });
  }

  ngOnInit(): void {
    this.setUser();
    this.setDocumentTypes();
  }

  public setUser(): void {
    let user = this.authenticationService.getUser();
    this.userService.getUser(user[environment.AUTHENTICATION.ATTR.USERNAME]).then(result => {
      this.user = result;
    })
  }

  public getExamForm(): FormGroup{
    return this.examForm;
  }

  public setDocumentTypes(): void {
    this.parameterService.getDocumentTypes().then(result => {
      this.documentTypes = result;
    });
  }

  public getDocumentTypes(): DocumentType[] {
    return this.documentTypes;
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
    values['esDocNum'] = this.user.getDocNum();
    values['name'] = `${values['name']} ${values['lastname']}`;
    this.examForm.reset();
    this.examService.registerExam(values).then(result => {
      if (result) {
        this.noticeService.alertMessageRestart(environment.VALUE.MESSAGE.EXAM.ADDITION.SUCCESS);
      } else {
        this.noticeService.alertMessage(environment.VALUE.MESSAGE.EXAM.ADDITION.ERROR);
      }
    });
  }

}
