import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AuthService } from ".././auth-service.service";
import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers : [AuthService]
})
export class SignupComponent implements OnInit {
signupForm : FormGroup;
user = {};
b;
  constructor(private fb: FormBuilder,private authService: AuthService, private db: AngularFireDatabase) { }

  ngOnInit() {
    
    this.signupForm = this.fb.group({
      'userEmail'    : [null,Validators.required],
	  'userPassword' : [null,Validators.required],
	  'userName'     : [null,Validators.required]
    })
  }

  signupData(){
	
    console.log(this.signupForm.value)
    this.b = this.authService.emailSignUp(this.signupForm.value)
    console.log(this.b);
  
	
   
  }

}

















