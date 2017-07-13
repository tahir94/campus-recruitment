import { Injectable } from '@angular/core';
import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from "@angular/router";
import * as firebase from 'firebase';

@Injectable()
export class AuthService {
title : string;
authState : any ;
userName;
userId;
userId2;
checking;
  constructor(private afAuth : AngularFireAuth, private db: AngularFireDatabase,private router : Router) { 

    // this.afAuth.authState.subscribe((auth)=>{
    //   this.authState = auth;
    //   console.log(this.authState.uid)
    // })
  }
    get authenticated(): boolean {
    return this.authState !== null;
  }
    get currentUserId(): string {
    return this.authenticated ? this.authState.uid : '';
  }

    emailSignUp(email:string, password:string,displayName) {
		this.userName = displayName;
	
		console.log(this.userName)
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
	  .then((user) => {
		this.authState = user;
		console.log(this.authState)
		this.userId = this.authState.uid;
		console.log(this.userId);
		this.db.list('/student').push({name : this.userName, email : email, password : password})
	
		// this.updateUserData();
	
      })
      .catch(error => console.log(error));
  }






  

  emailLogin(email:string, password:string) {
     return this.afAuth.auth.signInWithEmailAndPassword(email, password)
       .then((user) => {
		 this.authState = user;
		  console.log(this.authState.uid);
			this.userId2 = this.authState.uid
		 localStorage.setItem('firebaseToken',this.authState.uid)
		//  this.updateUserData();
		//  console.log(this.updateUserData)
       })
       .catch(error => console.log(error));
  }
  
    signOut() {
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


}
