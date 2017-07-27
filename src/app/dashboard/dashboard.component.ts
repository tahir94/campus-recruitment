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

		this.companyType = localStorage.getItem('currentCompanyUserType');
		this.studentTytpe = localStorage.getItem('currentStudentUserType');
		this.firebaseToken = localStorage.getItem('firebaseToken');
		console.log(this.firebaseToken);

		if (this.firebaseToken && this.studentTytpe == "student" || this.companyType == null) {
			console.log('not a null')
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

			this.indexComparitor = -1;
		}
		else {

			this.isDetails = true;
			this.indexComparitor = i;
		}


		console.log("data", data);
	}

	apply(jobTitle, companyUid) {
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

		if (this.check == true) {
			alert('you have already applied in this job');
			this.check = false;
		}
		else {
			this.appliedByStudent.push({ applied: false, jobTitle: jobTitle, comapanyUid: companyUid, studentUid: this.afAuth.auth.currentUser.uid })
		}
	}

	signOut() {
		this.authService.signOut();

	}


}
