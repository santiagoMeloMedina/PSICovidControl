import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MisionComponent } from 'src/app/main/pages/content/mision/mision.component';
import { LoginComponent } from 'src/app/main/pages/login/login.component';
import { MainComponent } from './main/main.component';
import { ContactComponent } from './main/pages/content/contact/contact.component';
import { HomeComponent } from './main/pages/content/home/home.component';
import { RegisterComponent } from './main/pages/register/register.component';
import { DashboardComponent } from 'src/app/dashboard/dashboard.component';

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
    component: DashboardComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
