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
	appliedStudentDB: FirebaseListObservable<any>
	keyyys;
	keysend;
	f;
	h = 0;
	companyData;
	companyObject;
	studentProfileData;

	constructor(private afAuth: AngularFireAuth, private db: AngularFireDatabase, private authService: AuthService, private router: Router) {

		this.items = this.db.list('/jobsByCompanies')
		this.items.subscribe((data) => {
			console.log(data);
			data;
			for (let i = 0; i < data.length; i++) {
				console.log(data[i]);
				console.log(data[i].$key);
				//key of company
				this.companyObject = data[i].$key;
				this.companyUserKey = data[i].$key;
				this.keyyys = Object.keys(data[i]);
				for (let a in data[i]) {
					this.f = 0;
					while (this.f < 1) {
						data[i][a].$key = this.keyyys[this.h];
						this.h++;
						this.f = 1;
					}
					this.showCompanyData.push(data[i][a])
					console.log(this.showCompanyData)
					this.showCompanyTitle.push(data[i][a].jobTitle);
					this.showDescription.push(data[i][a].job_description);
				}
			}

		}
		)
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

	apply(companyTitle) {
		// debugger;
		console.log(companyTitle);
		// this.authService.applidStudentData(companyUid)
		this.getStudentCVdata = this.db.object('/students-CV/' + this.afAuth.auth.currentUser.uid);
		this.getStudentCVdata.subscribe((data) => {
			console.log(data)
			this.studentProfileData = data;
			// debugger;
			// this.appliedStudentData.push(data);
			// console.log(this.appliedStudentData);
			this.appliedStudentDB = this.db.list('jobsByCompanies');
			this.appliedStudentDB.subscribe((data) => {
				console.log(data);
				for (let i = 0; i < data.length; i++) {
					console.log(data[i]);
					for (let a in data[i]) {
						this.jobsByCompaniesData = data[i][a]
						console.log('1', data[i][a]);
						this.companyData = data[i][a];
						console.log(this.companyObject)
					}
				}



			});

			//setTimeout(() => {
				this.appliedStudentDB = this.db.list("/appliedByStudent");
				this.studentProfileData.id = companyTitle;
				this.studentProfileData.appliedCompanyEmail = this.companyObject;
				// this.
				console.log(this.studentProfileData);
				this.appliedStudentDB.push(this.studentProfileData)

			//}, 3000)

		})


		// this.authService.applidStudentData(this.appliedStudentData)
		// this.applyForJob.emit(this.appliedStudentData)
		// console.log(this.getStudentCVdata)
	}

	signOut() {

		this.authService.signOut();
	}


}
