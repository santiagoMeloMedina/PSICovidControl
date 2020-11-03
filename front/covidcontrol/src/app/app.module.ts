import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

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
import { EntryComponent } from './component/dashboard/entry/entry.component';
import { ExamComponent } from './component/dashboard/exam/exam.component';

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
    ExamComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
