import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MisionComponent } from 'src/app/component/main/pages/content/mision/mision.component';
import { LoginComponent } from 'src/app/component/main/pages/login/login.component';
import { MainComponent } from 'src/app/component/main/main.component';
import { ContactComponent } from 'src/app/component/main/pages/content/contact/contact.component';
import { HomeComponent } from 'src/app/component/main/pages/content/home/home.component';
import { RegisterComponent } from 'src/app/component/main/pages/register/register.component';
import { DashboardComponent } from 'src/app/component/dashboard/dashboard.component';
import { ActionComponent } from '@component/dashboard/action/action.component';
import { EntryHistoryComponent } from '@component/dashboard/entry-history/entry-history.component';
import { ExamComponent } from '@component/dashboard/exam/exam.component';
import { CreateAccountComponent } from '@component/dashboard/create-account/create-account.component';
import { EnableDisableComponent } from '@component/dashboard/enable-disable/enable-disable.component';
import { AuthorizeComponent } from '@component/dashboard/authorize/authorize.component';
import {EntryComponent} from '@component/dashboard/entry/entry.component';
import { EditInformationComponent } from '@component/dashboard/edit-information/edit-information.component';

const routes: Routes = [
  {
    path: "",
    component: MainComponent,
    children: [
      {
        path: "",
        component: HomeComponent
      },
      {
        path: "login",
        component: LoginComponent
      },
      {
        path: "register",
        component: RegisterComponent
      },
      {
        path: "mision",
        component: MisionComponent
      },
      {
        path: "contact",
        component: ContactComponent
      }
    ]
  },
  {
    path: "dashboard",
    component: DashboardComponent,
    children: [
      {
        path: "",
        component: ActionComponent
      },
      {
        path:"entry",
        component: EntryHistoryComponent
      },
      {
        path:"exam",
        component: ExamComponent
      },
      {
        path:"create-account",
        component: CreateAccountComponent
      },
      {
        path:"enable-disable",
        component:EnableDisableComponent
      },
      {
        path:"authorize",
        component: AuthorizeComponent
      },
      {
        path:"register-entry",
        component: EntryComponent
      },
      {
        path:"edit-information",
        component: EditInformationComponent
      }
    ]
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
