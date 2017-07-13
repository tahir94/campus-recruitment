import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { environment } from '../environments/environment';

import 'hammerjs';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MdCardModule} from '@angular/material';
import {MdButtonModule} from '@angular/material';
import {MdInputModule} from '@angular/material';
import {MdToolbarModule} from '@angular/material';
import { SignupComponent } from './signup/signup.component';

import { RouterModule, Routes } from '@angular/router';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';


const appRoutes : Routes = [
  {path : '', component: LoginComponent},
  {path : 'app-login', component : LoginComponent },
  {path : 'app-signup', component : SignupComponent},
  {path : 'app-dashboard',component : DashboardComponent}
  
]


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase,"Campus Recruitment"),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    RouterModule.forRoot(
      appRoutes,
      {enableTracing : true}
    ),
    FormsModule,
    ReactiveFormsModule,
    MdButtonModule,
    MdInputModule,
    MdCardModule,
    MdToolbarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
