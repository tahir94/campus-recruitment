import { Component, OnInit } from '@angular/core';
import { MdInputModule } from '@angular/material';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { AuthService } from ".././auth-service.service";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";



@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']

})
export class LoginComponent implements OnInit {
	loginForm: FormGroup;
	loginAuth;
	firebaseToken;


	constructor(private db: AngularFireDatabase, private authService: AuthService, private fb: FormBuilder, private router: Router) { }

	ngOnInit() {
		this.loginForm = this.fb.group({
			'userEmail': "com33@c.com",
			'userPassword': "000000"
		});

	}

	login() {

		this.loginAuth = this.authService.emailLogin(this.loginForm.value.userEmail, this.loginForm.value.userPassword)

	}

}
