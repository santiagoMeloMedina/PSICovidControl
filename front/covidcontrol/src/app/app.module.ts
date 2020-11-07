import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from 'src/app/component/main/pages/login/login.component';
import { MenuComponent } from 'src/app/component/main/menu/menu.component';
import { MisionComponent } from 'src/app/component/main/pages/content/mision/mision.component';
import { MainComponent } from 'src/app/component/main/main.component';
import { ContactComponent } from 'src/app/component/main/pages/content/contact/contact.component';
import { HomeComponent } from 'src/app/component/main/pages/content/home/home.component';
import { RegisterComponent } from 'src/app/component/main/pages/register/register.component';
import { DashboardComponent } from 'src/app/component/dashboard/dashboard.component';
import { ActionComponent } from './component/dashboard/action/action.component';
import { EntryComponent } from './component/dashboard/entry/entry.component';
import { ExamComponent } from './component/dashboard/exam/exam.component';
import { CreateAccountComponent } from './component/dashboard/create-account/create-account.component';
import { EnableDisableComponent } from './component/dashboard/enable-disable/enable-disable.component';
import { AuthorizeComponent } from './component/dashboard/authorize/authorize.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MenuComponent,
    MisionComponent,
    MainComponent,
    ContactComponent,
    HomeComponent,
    RegisterComponent,
    DashboardComponent,
    EntryComponent,
    ExamComponent,
    ActionComponent,
    CreateAccountComponent,
    EnableDisableComponent,
    AuthorizeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
