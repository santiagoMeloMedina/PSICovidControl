import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from 'src/app/main/pages/login/login.component';
import { MenuComponent } from 'src/app/main/menu/menu.component';
import { MisionComponent } from 'src/app/main/pages/content/mision/mision.component';
import { MainComponent } from 'src/app/main/main.component';
import { ContactComponent } from './main/pages/content/contact/contact.component';
import { HomeComponent } from './main/pages/content/home/home.component';
import { RegisterComponent } from './main/pages/register/register.component';
import { DashboardComponent } from './main/pages/dashboard/dashboard.component';

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
    DashboardComponent
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
