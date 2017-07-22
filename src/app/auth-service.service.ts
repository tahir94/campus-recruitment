import { Injectable } from '@angular/core';
import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable,FirebaseObjectObservable } from 'angularfire2/database';
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
	viewAppliedData : FirebaseObjectObservable<any>;
	data: FirebaseListObservable<any>;
	constructor(private afAuth: AngularFireAuth, private db: AngularFireDatabase, private router: Router) {
		console.log('service firebaseToken', this.firebaseToken)
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
		return this.afAuth.auth.createUserWithEmailAndPassword(studentData.userEmail, studentData.userPassword)
			.then((user) => {

				AuthService.authState = user;
				console.log(AuthService.authState)
				this.userId = AuthService.authState.uid;
				console.log(this.userId);
				// this.db.list('/students').push({name : this.userName, email : email, password : password})
				studentData.type = "student";
				console.log('stdData', studentData.type);
				// this.db.list('/students').update(AuthService.authState.uid,{name : studentData.userName, email : studentData.userEmail, password : studentData.userPassword, type : studentData.type})
				this.db.list('users').update(this.userId, studentData)
				localStorage.setItem('currentStudentUserType', studentData.type)
				console.log(this.v);
				this.router.navigate(['/app-dashboard'])
				// this.updateUserData();

			})
			.catch(error => console.log(error));
	}
	emailLogin(email: string, password: string) {
		this.afAuth.auth.signInWithEmailAndPassword(email, password)
			.then((data) => {
				//--------------------------------------------

				// console.log("data", data);
				// this.db.list('/users').subscribe((innerData) => {
				// 	console.log("innerData", innerData);
				// 	this.logindata = innerData;
				// 	this.logindata.forEach((user, i) => {
				// 		console.log('userrr!!!1', user)
				// 		if (user.userEmail == email) {
				// 			console.log('iiiii', i);

				// 			console.log('ttttttttt', this.logindata[i].type)
				// 		}
				// 	})

				// })

				//------------------------------
				// ---- console.log(this.logindata)
				// this.logindata.forEach((data )=> {
				// 	console.log(data)
				// });
				// ---- console.log(data.uid);
				// for(let i = 0; i < this.innerData.length; i++) {
				// 	if(this.innerData[i].email == email && this.innerData[i].password == password) {
				// 		s = innerData[i];
				// 		break;
				// 	}
				// }
				this.db.object('/users/' + this.afAuth.auth.currentUser.uid).subscribe((innerData) => {
					console.log(innerData.type);
					this.userData = innerData;
					if(this.userData.type == 'student') {
						this.router.navigate(['/app-dashboard']);
						this.firebaseToken = localStorage.setItem('firebaseToken', this.afAuth.auth.currentUser.uid);
					}else{
						this.firebaseToken = localStorage.setItem('firebaseToken', this.afAuth.auth.currentUser.uid);
						this.router.navigate(['/app-company-dashboard']);
					}
				})
				
			})
		// .then((user) => {
		// 	this.authState = user;
		// 	console.log('this.authState', this.authState);
		// 	this.db.list('/items', { preserveSnapshot: true })
		// 		.subscribe(snapshots => {
		// 			snapshots.forEach(snapshot => {
		// 				console.log(snapshot.key)
		// 				console.log(snapshot.val())
		// 			});
		// 		})
		// })
		// .catch(error => console.log(error));
	}

	// emailLogin(email: string, password: string) {
	//   console.log('comUserEmail',this.companyUserEmail);

	// debugger;
	// console.log(this.afAuth.auth.currentUser.email)
	//  this.afAuth.auth.signInWithEmailAndPassword(email, password)

	// .then((user) => {
	// 	console.log("userID " + this.afAuth.auth.currentUser);
	// 	console.log(user)
	// 	console.log(user.uid)
	// 	this.data = this.db.list('/users', { preserveSnapshot: true });
	// this.data.subscribe(snapshots => {
	// 	snapshots.forEach(snapshot => {
	// 		console.log(snapshot.key)
	// 		console.log(snapshot.val())
	// 	});
	// })
	// AuthService.authState = user;
	// console.log(AuthService.authState);
	// this.userId2 = AuthService.authState.uid
	// this.firebaseToken = localStorage.setItem('firebaseToken', AuthService.authState.uid);


	// 	  this.currentUser = JSON.stringify(localStorage.getItem("firebaseToken"));	
	//   console.log('currentUser',this.currentUser);



	// this.companyType = localStorage.getItem('currentCompanyUserType');
	// this.studentTytpe = localStorage.getItem('currentStudentUserType');
	// console.log('companY Type', this.companyType);
	// console.log('std type', this.studentTytpe)

	// if (this.studentTytpe == "student" || this.companyType == null) {
	// 	console.log('navigation S!')
	// 	this.router.navigate(['/app-dashboard'])
	// }
	// else {
	// 	console.log('navigation C!')
	// 	this.router.navigate(['/app-company-dashboard'])
	// }

	// this.currentUser = this.afAuth.auth.currentUser;
	//   console.log(this.currentUser.name)
	//   if(AuthService.authState.uid){
	//   this.router.navigate(['/app-dashboard'])
	//   }
	//   else {
	// 	  this.router.navigate(['/login'])
	//   }
	//  this.updateUserData();
	//  console.log(this.updateUserData)
	// })
	// .catch(error => console.log(error));


	// }

	signOut() {

		localStorage.removeItem('currentCompanyUserType');
		localStorage.removeItem('currentStudentUserType');
		console.log('111111', this.userId2)
		this.afAuth.auth.signOut();
		console.log('222222', this.userId2)
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
	studentServiceData(data) {

		console.log('data', data);
		console.log('uid', this.afAuth.auth.currentUser.uid)
		// this.db.list('/students-CV').update(key,{data})
		this.db.list('/students-CV').update(this.afAuth.auth.currentUser.uid, { fullName: data.fullName, CNIC: data.CNIC, mobile: data.mobile, description: data.description, gender: data.genderOptions, preferredIndustry: data.preferredIndustry })

	}

	CompanySignup(CompanySignupData) {
		this.companyUserEmail = CompanySignupData.CompanyEmail;

		// console.log(CompanySignupData.CompanyEmail);

		console.log(CompanySignupData.CompanyPassword)
		return this.afAuth.auth.createUserWithEmailAndPassword(CompanySignupData.CompanyEmail, CompanySignupData.CompanyPassword)
			.then((user) => {
				AuthService.authState = user;
				console.log(AuthService.authState)
				this.userId = AuthService.authState.uid;
				console.log(this.userId);
				CompanySignupData.type = 'company';
				console.log(CompanySignupData.type)
				this.db.list('users').update(this.userId,  CompanySignupData );
				// this.router.navigate([/companyDashboard])
				//  this.db.list('profile')
				localStorage.setItem('currentCompanyUserType', CompanySignupData.type)
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



	getTahirBhai() {
		return this.userData;
	}


// applidStudentData(data){
// 	// debugger;
// 	this.viewAppliedData = this.db.object('/jobsByCompanies/');
// 	this.viewAppliedData.subscribe((data)=>{
// 		console.log(data)
// 	});
// for(let i = 0; i < data.length ; i++){
// 	console.log(data[i])
// }

// console.log('data',data);

// this.ddd = this.appliedStudentsArray.push(data);
// console.log('ddd',this.appliedStudentsArray)
// }

}

//  3b central avenue 