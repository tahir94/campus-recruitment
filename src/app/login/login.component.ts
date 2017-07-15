import { Component, OnInit } from '@angular/core';
import {MdInputModule} from '@angular/material';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {AuthService } from ".././auth-service.service";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers : [AuthService]
})
export class LoginComponent implements OnInit {
loginForm : FormGroup;
loginAuth;
firebaseToken;
c;

  constructor(private authService: AuthService,private fb : FormBuilder,private router : Router) {
	// this.authService.demo()
	

   }

  ngOnInit() {
	  this.loginForm = this.fb.group({
		  'userEmail' : "a@gmail.com",
		   'userPassword' : "000000"
	  });
		//   console.log(this.loginForm.value)
  }

  login(){
	
	  this.loginAuth = this.authService.emailLogin(this.loginForm.value.userEmail,this.loginForm.value.userPassword);
       console.log(this.loginAuth)	

   
  }

}
