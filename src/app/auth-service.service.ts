import { Injectable } from '@angular/core';
import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from "@angular/router";
import * as firebase from 'firebase';

@Injectable()
export class AuthService {
title : string;
static authState : any ;
userName;
userId;
userId2;
checking;
companyUserEmail;
currentUser;
companyType;
studentTytpe;
firebaseToken;
v;
  constructor(private afAuth : AngularFireAuth, private db: AngularFireDatabase,private router : Router) { 
     console.log('service firebaseToken',this.firebaseToken)
    // this.afAuth.authState.subscribe((auth)=>{
    //   this.authState = auth;
    //   console.log(this.authState.uid)
    // })
  }
    get authenticated(): boolean {
    return AuthService.authState !== null;
  }
    get currentUserId(): string {
    return this.authenticated ? AuthService.authState.uid : '';
  }

    emailSignUp(studentData) {
		// this.userName = displayName;
	
		console.log(this.userName)
    return this.afAuth.auth.createUserWithEmailAndPassword(studentData.userEmail,studentData.userPassword)
	  .then((user) => {
		
		AuthService.authState = user;
		console.log(AuthService.authState)
		this.userId = AuthService.authState.uid;
		console.log(this.userId);
		// this.db.list('/students').push({name : this.userName, email : email, password : password})
		studentData.type = "student";
		console.log('stdData',studentData.type);
		this.db.list('/students').update(AuthService.authState.uid,{name : studentData.userName, email : studentData.userEmail, password : studentData.userPassword, type : studentData.type})
		localStorage.setItem('currentStudentUserType',studentData.type)
		console.log(this.v);
		this.router.navigate(['/app-dashboard'])
		// this.updateUserData();
	
      })
      .catch(error => console.log(error));
  }


  emailLogin(email:string, password:string) {
	//   console.log('comUserEmail',this.companyUserEmail);
	
	 	
	// console.log(this.afAuth.auth.currentUser.email)
     return this.afAuth.auth.signInWithEmailAndPassword(email, password)
       .then((user) => {
		console.log("userID " +this.afAuth.auth.currentUser);
				
		 AuthService.authState = user;
		  console.log(AuthService.authState);
			this.userId2 = AuthService.authState.uid
		this.firebaseToken = localStorage.setItem('firebaseToken',AuthService.authState.uid);
	// 	  this.currentUser = JSON.stringify(localStorage.getItem("firebaseToken"));	
	//   console.log('currentUser',this.currentUser);
		this.companyType  =  localStorage.getItem('currentCompanyUserType');
		this.studentTytpe =  localStorage.getItem('currentStudentUserType');
		console.log('companY Type', this.companyType);
		console.log('std type',this.studentTytpe)
		
			   if(this.studentTytpe == "student" || this.companyType == null){
		  console.log('navigation S!')	  
     this.router.navigate(['/app-dashboard'])
		 }	
		else{
		console.log('navigation C!')	 
        this.router.navigate(['/app-company-dashboard'])
		 }	  
		  	
		 this.currentUser = this.afAuth.auth.currentUser;
			//   console.log(this.currentUser.name)
		//   if(AuthService.authState.uid){
			//   this.router.navigate(['/app-dashboard'])
		//   }
			//   else {
			// 	  this.router.navigate(['/login'])
			//   }
		//  this.updateUserData();
		//  console.log(this.updateUserData)
       })
	   .catch(error => console.log(error));
	   
	  
  }
  
    signOut() {

	localStorage.removeItem('currentCompanyUserType');
    localStorage.removeItem('currentStudentUserType');
    console.log('111111',this.userId2)			
	this.afAuth.auth.signOut();
	  console.log('222222',this.userId2)
	// alert(this.userId2)
	// console.log(this.authState.uid);
	localStorage.removeItem('firebaseToken')
    this.router.navigate(['/'])
		 
// 	 this.afAuth.authState.subscribe((auth)=>{
// 	 this.authState = auth;
// 	 console.log('this.userId',this.userId)
// 	  console.log(this.authState)
    
//  })

  }
studentServiceData(data){
	
	console.log('data',data);
	console.log('uid',this.afAuth.auth.currentUser.uid)
	// this.db.list('/students-CV').update(key,{data})
	this.db.list('/students-CV').update(this.afAuth.auth.currentUser.uid,{fullName : data.fullName,CNIC : data.CNIC, mobile : data.mobile, description : data.description , gender : data.genderOptions,preferredIndustry : data.preferredIndustry })
	
}

CompanySignup(CompanySignupData){
	this.companyUserEmail = CompanySignupData.CompanyEmail;

// console.log(CompanySignupData.CompanyEmail);

console.log(CompanySignupData.CompanyPassword)
	return this.afAuth.auth.createUserWithEmailAndPassword(CompanySignupData.CompanyEmail,CompanySignupData.CompanyPassword)
       .then((user) => {
		AuthService.authState = user;
		console.log(AuthService.authState)
		this.userId = AuthService.authState.uid;
		console.log(this.userId);
		CompanySignupData.type = 'company';
		console.log(CompanySignupData.type)
		this.db.list('company-user').push(CompanySignupData);
		// this.router.navigate([/companyDashboard])
	    //  this.db.list('profile')
		localStorage.setItem('currentCompanyUserType',CompanySignupData.type)
		this.router.navigate(['/app-company-dashboard'])
	
      })
      .catch(error => console.log(error));
	// this.db.list("/company-user").push(CompanySignupData)
}



    // private updateUserData(): void {
  // Writes user name and email to realtime db
  // useful if your app displays information about users or for admin features

    // const path = `users/${this.currentUserId}`; // Endpoint on firebase
//     const data = {
//                   email: this.authState.email,
// 				  name: this.authState.displayName,
// 				//   namee : this.namee
// 				}
				

//     this.db.object(path).update(data)
//     .catch(error => console.log(error));

//   }
// demo(){
// 	console.log(this.firebaseToken)
// }



}
