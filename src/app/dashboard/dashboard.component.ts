import { Component, OnInit } from '@angular/core';
import {AuthService } from ".././auth-service.service";
import { Router } from "@angular/router";
import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';


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
showCompanyTitle = [];
showDescription = [];
showCompanyData = [];
items : FirebaseListObservable<any>

  constructor( private db: AngularFireDatabase,private authService: AuthService,private router:Router) {
	
	  this.items = this.db.list('/jobsByCompanies')
	this.items.subscribe((data)=>{console.log(data)
		for(let i = 0; i < data.length; i++){
		  console.log(data[i]);

		for(let a in data[i]){
			console.log(data[i][a]);
            this.showCompanyData.push(data[i][a])
			this.showCompanyTitle.push(data[i][a].jobTitle);
			this.showDescription.push(data[i][a].job_description) 
		}
		}
	})
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
