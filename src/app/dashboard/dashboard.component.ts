import { Component, OnInit } from '@angular/core';
import {AuthService } from ".././auth-service.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers : [AuthService]
})
export class DashboardComponent implements OnInit {
firebaseToken;
companyType;
studentTytpe;

  constructor(private authService: AuthService,private router:Router) { 
	  this.companyType  =  localStorage.getItem('currentCompanyUserType');
		this.studentTytpe =  localStorage.getItem('currentStudentUserType');
	  	this.firebaseToken = localStorage.getItem('firebaseToken');
		  console.log(this.firebaseToken);
		
	if(this.firebaseToken && this.studentTytpe == "student" || this.companyType == null){
		console.log('not a nulll')
		  this.router.navigate(['/app-dashboard'])
	  }
		  else if (this.firebaseToken && this.companyType == "company" || this.studentTytpe == null){
            this.router.navigate(['/app-company-dashboard'])  
}		  else if(this.firebaseToken == null){
			  console.log('null')
			  this.router.navigate(['/app-login'])
		  }
		 
  }

  ngOnInit() {
  }

  signOut(){
    this.authService.signOut();
  }

}
