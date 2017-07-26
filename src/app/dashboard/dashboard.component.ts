import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from ".././auth-service.service";
import { Router } from "@angular/router";
import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.css'],
	providers: [AuthService]
})
export class DashboardComponent implements OnInit {
	@Output() applyForJob = new EventEmitter;
	firebaseToken;
	companyType;
	studentTytpe;
	showCompanyTitle = [];
	showDescription = [];
	showCompanyData = [];
	isDetails = false;
	show = false;
	getStudentCVdata: FirebaseObjectObservable<any>;
	indexComparitor = -1;
	items: FirebaseListObservable<any>;
	appliedStudentData = [];
	jobsByCompaniesData;
	companyUserKey;
	appliedStudentData2: FirebaseListObservable<any>
	appliedStudentDB: FirebaseListObservable<any>;
	appliedStudentDB2: FirebaseListObservable<any>
	keyyys;
	keysend;
	f;
	h = 0;
	companyData;
	companyObject;
	studentProfileData;


	// 
	isApplied;
	isApply: boolean = true;
	companyArray = [];
	appliedByStudent;
	appliedNode;
	selectAppliedCandidates: FirebaseListObservable<any>;
	check = false;
	isSubmitDisabled

	constructor(private afAuth: AngularFireAuth, private db: AngularFireDatabase, private authService: AuthService, private router: Router) {



		this.selectAppliedCandidates = db.list('/appliedByStudent', { preserveSnapshot: true });
		this.selectAppliedCandidates
			.subscribe(snapshots => {
				snapshots.forEach(snapshot => {
					console.log(snapshot.key)
					console.log(snapshot.val().applied);
					this.appliedNode = snapshot.val().applied
					if (snapshot.val().applied == false) {
						console.log(snapshot.key);
						console.log(snapshot.val());
						console.log('applied !!!');
						// this.isApply = false;
						// this.isApplied = true;

					}
				});
			})

		this.items = db.list('/jobsByCompanies', { preserveSnapshot: true });
		this.items
			.subscribe(snapshots => {
				snapshots.forEach(snapshot => {
					// company key
					console.log(snapshot.key)
					console.log(snapshot.val());

					snapshot.forEach(param => {
						// job key	
						console.log(param.key)
						console.log(param.val());
						this.companyArray.push(param.val());
						console.log(this.companyArray);


					});

				});
			})
		// this.items.subscribe((data) => {
		// 	console.log(data);
		// 	data;
		// 	for (let i = 0; i < data.length; i++) {
		// 		console.log(data[i]);
		// 		console.log(data[i].$key);
		// 		//key of company
		// 		this.companyObject = data[i].$key;
		// 		this.companyUserKey = data[i].$key;
		// 		this.keyyys = Object.keys(data[i]);
		// 		for (let a in data[i]) {
		// 			this.f = 0;
		// 			while (this.f < 1) {
		// 				data[i][a].$key = this.keyyys[this.h];
		// 				this.h++;
		// 				this.f = 1;
		// 			}
		// 			this.showCompanyData.push(data[i][a])
		// 			console.log(this.showCompanyData)
		// 			this.showCompanyTitle.push(data[i][a].jobTitle);
		// 			this.showDescription.push(data[i][a].job_description);
		// 		}
		// 	}

		// }

		this.companyType = localStorage.getItem('currentCompanyUserType');
		this.studentTytpe = localStorage.getItem('currentStudentUserType');
		this.firebaseToken = localStorage.getItem('firebaseToken');
		console.log(this.firebaseToken);

		if (this.firebaseToken && this.studentTytpe == "student" || this.companyType == null) {
			console.log('not a nulll')
			this.router.navigate(['/app-dashboard'])
		}
		else if (this.firebaseToken && this.companyType == "company" || this.studentTytpe == null) {
			this.router.navigate(['/app-company-dashboard'])
		} else if (this.firebaseToken == null) {
			console.log('null')
			this.router.navigate(['/app-login'])
		}



	}

	ngOnInit() {
	}

	details(i, data) {
		console.log("i", i);
		console.log("this.indexComparitor", this.indexComparitor);
		if (i == this.indexComparitor) {
			console.log("hitting")
			this.indexComparitor = -1;
		}
		else {
			console.log("hitting,111");
			this.isDetails = true;
			this.indexComparitor = i;
		}


		console.log("data", data);
	}

	apply(jobTitle, companyUid) {
		// console.log(jobTitle);
		// console.log(companyUid);
		this.isApply = false;
		this.isApplied = true;


		this.appliedByStudent = this.db.list('appliedByStudent', { preserveSnapshot: true });
		this.appliedByStudent

			.subscribe(snapshots => {
				snapshots.forEach(snapshot => {
					console.log(snapshot.key)
					console.log(snapshot.val());
					if (snapshot.val().studentUid == this.afAuth.auth.currentUser.uid) {
						if (snapshot.val().jobTitle == jobTitle) {
							this.check = true;
							console.log(snapshot.val());
							

						}
					}
				});
			})

		// .subscribe((snapshot) => {
		// 	// console.log(snapshot.key);
		// 	snapshot.forEach(sna)
		// 	console.log(snapshot.val());



		// });
		if (this.check == true) {
			alert('you have already applied in this job');
			this.check = false;
		}
		else {
			this.appliedByStudent.push({ applied: false, jobTitle: jobTitle, comapanyUid: companyUid, studentUid: this.afAuth.auth.currentUser.uid })
		}



	}

	// apply(jobTitle,companyUid) {

	// 	console.log(jobTitle);
	//////////	// this.authService.applidStudentData(companyUid)
	// this.getStudentCVdata = this.db.object('/students-CV/' + this.afAuth.auth.currentUser.uid);
	// this.getStudentCVdata.subscribe((data) => {
	// 	console.log(data)
	// 	this.studentProfileData = data;
	///////////		// debugger;
	//////////		// this.appliedStudentData.push(data);
	////////////		// console.log(this.appliedStudentData);
	// this.appliedStudentDB = this.db.list('/jobsByCompanies', { preserveSnapshot: true });
	// this.appliedStudentDB.subscribe((data) => {
	// 	console.log(data);
	// 	for (let i = 0; i < data.length; i++) {
	// 		console.log(data[i]);
	// 		for (let a in data[i]) {
	// 			this.jobsByCompaniesData = data[i][a]
	// 			console.log('1', data[i][a]);
	// 			this.companyData = data[i][a];
	// 			console.log(this.companyObject)
	// 		}
	// 	}



	// });

	////////////	//setTimeout(() => {
	// this.appliedStudentDB2 = this.db.list("/appliedByStudent");
	// this.studentProfileData.id = jobTitle;
	////////	// this.studentProfileData.appliedCompanyEmail = this.companyObject;
	////////	// this.
	// console.log(this.studentProfileData);
	// this.appliedStudentDB.push(this.studentProfileData)

	/////  //}, 3000)

	// })


	///////	// this.authService.applidStudentData(this.appliedStudentData)
	///////	// this.applyForJob.emit(this.appliedStudentData)
	///////	// console.log(this.getStudentCVdata)
	// }

	signOut() {

		this.authService.signOut();
	}


}
