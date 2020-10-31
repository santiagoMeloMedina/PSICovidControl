import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MisionComponent } from './main/content/mision/mision.component';
import { LoginComponent } from './main/login/login.component';
import { MenuComponent } from './main/menu/menu.component';

const routes: Routes = [
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "mision",
    component: MisionComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
