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
import {MdSelectModule} from '@angular/material';
import {MdTableModule} from '@angular/material';
import { CdkTableModule } from "@angular/cdk";
import {MdTabsModule} from '@angular/material';

import { SignupComponent } from './signup/signup.component';

import { RouterModule, Routes } from '@angular/router';
import {AuthService } from "././auth-service.service";

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StudentCVComponent } from './student-CV/student-cv.component';
import { CompanyComponent } from   './company-signup/company.component';
import { CompanyDashboardComponent } from './company-dashboard/company-dashboard.component';
import { CompanyPostJobComponent } from './company-post-job/company-post-job.component';
import { AllStudentsComponent } from './all-students/all-students.component';
import { AdminComponent } from './admin/admin.component';






const appRoutes : Routes = [
  {path : '', component: LoginComponent},
  {path : 'app-login', component : LoginComponent },
  {path : 'app-signup', component : SignupComponent},
  {path : 'app-dashboard',component : DashboardComponent},
  {path : 'app-student-cv' , component : StudentCVComponent},
  {path : 'app-company'    , component : CompanyComponent},
  {path : 'app-company-dashboard'    , component : CompanyDashboardComponent},
  {path : 'app-company-post-job' , component : CompanyPostJobComponent},
  {path : 'app-all-students' , component : AllStudentsComponent},
  {path : 'app-admin' , component : AdminComponent}
]


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    DashboardComponent,
    StudentCVComponent,
    CompanyComponent,
    CompanyDashboardComponent,
    CompanyPostJobComponent,
	AllStudentsComponent,
	AdminComponent
  
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
	MdToolbarModule,
	MdSelectModule,
	MdTableModule,
	CdkTableModule,
	MdTabsModule
	
  ],
  providers: [AuthService], 
  bootstrap: [AppComponent]
})
export class AppModule { }
