import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActionGuard, DashboardGuard, MainGuard } from 'src/app/app.authguard';
import { MisionComponent } from 'src/app/component/main/pages/content/mision/mision.component';
import { LoginComponent } from 'src/app/component/main/pages/login/login.component';
import { MainComponent } from 'src/app/component/main/main.component';
import { ContactComponent } from 'src/app/component/main/pages/content/contact/contact.component';
import { HomeComponent } from 'src/app/component/main/pages/content/home/home.component';
import { RegisterComponent } from 'src/app/component/main/pages/register/register.component';
import { DashboardComponent } from 'src/app/component/dashboard/dashboard.component';
import { ActionComponent } from '@component/dashboard/action/action.component';
import { EntryHistoryComponent } from '@component/dashboard/entry-history/entry-history.component';
import { ExamHistoryComponent } from '@component/dashboard/exam-history/exam-history.component';
import { CreateAccountComponent } from '@component/dashboard/create-account/create-account.component';
import { EnableDisableComponent } from '@component/dashboard/enable-disable/enable-disable.component';
import { AuthorizeComponent } from '@component/dashboard/authorize/authorize.component';
import { EntryComponent } from '@component/dashboard/entry/entry.component';
import { EditInformationComponent } from '@component/dashboard/edit-information/edit-information.component';
import { ExamComponent } from '@component/dashboard/exam/exam.component';
import { RegisterDetailComponent } from 'src/app/component/main/pages/register/register-detail/register-detail.component';



export const routes: Routes = [
  {
    path: "",
    component: MainComponent,
    canActivate: [MainGuard],
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
        path: "register-detail",
        component: RegisterDetailComponent
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
    canActivate: [DashboardGuard],
    children: [
      {
        path: "",
        component: ActionComponent
      },
      {
        path:"entry",
        component: EntryHistoryComponent,
        canActivate: [ActionGuard],
        data: { name: "ENTRY"}
      },
      {
        path:"exam",
        component: ExamHistoryComponent,
        canActivate: [ActionGuard],
        data: { name: "EXAM"}
      },
      {
        path:"create-account",
        component: CreateAccountComponent,
        canActivate: [ActionGuard],
        data: { name: "C_ACCOUNT"}
      },
      {
        path:"enable-disable",
        component:EnableDisableComponent,
        canActivate: [ActionGuard],
        data: { name: "ENABLE"}
      },
      {
        path:"authorize",
        component: AuthorizeComponent,
        canActivate: [ActionGuard],
        data: { name: "AUTORIZE"}
      },
      {
        path:"register-entry",
        component: EntryComponent,
        canActivate: [ActionGuard],
        data: { name: "R_ENTRY"}
      },
      {
        path:"edit-information",
        component: EditInformationComponent,
        canActivate: [ActionGuard],
        data: { name: "EDIT"}
      },
      {
        path:"register-exam",
        component:ExamComponent,
        canActivate: [ActionGuard],
        data: { name: "R_EXAM"}
      }
    ]
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
