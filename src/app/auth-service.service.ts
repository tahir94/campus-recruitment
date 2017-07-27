import { Injectable } from '@angular/core';
import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from "@angular/router";
import * as firebase from 'firebase';

@Injectable()
export class AuthService {
	title: string;
	static authState: any;
	tahirBhai;
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
	authState;
	items;
	logindata;
	userData;
	ddd;
	appliedStudentsArray = [];
	value;
	viewAppliedData: FirebaseObjectObservable<any>;
	data: FirebaseListObservable<any>;
	adminEmail;
	adminUid;
	admin: FirebaseListObservable<any>;
	constructor(private afAuth: AngularFireAuth, private db: AngularFireDatabase, private router: Router) {
		console.log('service firebaseToken', this.firebaseToken)
		
	}

	emailSignUp(studentData) {
		
    
		return this.afAuth.auth.createUserWithEmailAndPassword(studentData.userEmail, studentData.userPassword)
			.then((user) => {

                 AuthService.authState = user;
				this.userId = AuthService.authState.uid;
				console.log(this.userId);
				
				studentData.type = "student";
				console.log('stdData', studentData.type);
				this.db.list('users').update(this.userId, studentData)
				localStorage.setItem('currentStudentUserType', studentData.type)
				console.log(this.v);
				this.router.navigate(['/app-dashboard'])
				

			})
			.catch(error => console.log(error));
	}
	emailLogin(email: string, password: string) {
		this.afAuth.auth.signInWithEmailAndPassword(email, password)
			.then((data) => {
		
		this.adminUid = this.afAuth.auth.currentUser.uid;
		if(this.adminUid === 'JLADWKDIuKeFQf4C6CSOU4qZyDr1'){
			this.router.navigate(['/app-admin']);
			localStorage.setItem('firebaseToken',this.afAuth.auth.currentUser.uid);
		}
	          this.db.object('/users/' + this.afAuth.auth.currentUser.uid).subscribe((innerData) => {
					console.log(innerData.type);
					this.userData = innerData;
					if (this.userData.type == 'student') {
						this.router.navigate(['/app-dashboard']);
						this.firebaseToken = localStorage.setItem('firebaseToken', this.afAuth.auth.currentUser.uid);
					} else if(this.userData.type == 'company' ){
						this.firebaseToken = localStorage.setItem('firebaseToken', this.afAuth.auth.currentUser.uid);
						this.router.navigate(['/app-company-dashboard']);
					}
				})

			})
}


	signOut() {

		localStorage.removeItem('currentCompanyUserType');
		localStorage.removeItem('currentStudentUserType');
		console.log('111111', this.userId2)
		this.afAuth.auth.signOut();
		console.log('222222', this.userId2)
		
		localStorage.removeItem('firebaseToken')
		this.router.navigate(['/'])

	}
	studentServiceData(data) {

		console.log('data', data);
		console.log('uid', this.afAuth.auth.currentUser.uid)
	
		this.db.list('/students-CV').update(this.afAuth.auth.currentUser.uid, { fullName: data.fullName, CNIC: data.CNIC, mobile: data.mobile, description: data.description, gender: data.genderOptions, preferredIndustry: data.preferredIndustry })

	}

	CompanySignup(CompanySignupData) {
		this.companyUserEmail = CompanySignupData.CompanyEmail;

	

		console.log(CompanySignupData.CompanyPassword)
		return this.afAuth.auth.createUserWithEmailAndPassword(CompanySignupData.CompanyEmail, CompanySignupData.CompanyPassword)
			.then((user) => {
				AuthService.authState = user;
				console.log(AuthService.authState)
				this.userId = AuthService.authState.uid;
				console.log(this.userId);
				CompanySignupData.type = 'company';
				console.log(CompanySignupData.type)
				this.db.list('users').update(this.userId, CompanySignupData);
			
				localStorage.setItem('currentCompanyUserType', CompanySignupData.type)
				this.router.navigate(['/app-company-dashboard'])

			})
			.catch(error => console.log(error));
		
	}

}
