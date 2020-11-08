import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/app.authguard';
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
import { environment } from 'src/environments/environment';

export const routes: Routes = [
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
        component: EntryHistoryComponent,
        canActivate: [AuthGuard],
        data: { name: "ENTRY"}
      },
      {
        path:"exam",
        component: ExamComponent,
        canActivate: [AuthGuard],
        data: { name: "EXAM"}
      },
      {
        path:"create-account",
        component: CreateAccountComponent,
        canActivate: [AuthGuard],
        data: { name: "C_ACCOUNT"}
      },
      {
        path:"enable-disable",
        component:EnableDisableComponent,
        canActivate: [AuthGuard],
        data: { name: "ENABLE"}
      },
      {
        path:"authorize",
        component: AuthorizeComponent,
        canActivate: [AuthGuard],
        data: { name: "AUTORIZE"}
      }
    ]
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
