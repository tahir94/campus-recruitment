import { Component, OnInit } from '@angular/core';
import { AngularFireDatabaseModule, FirebaseObjectObservable, AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from ".././auth-service.service";
import { Router } from "@angular/router";
import { Location } from "@angular/common";
@Component({
	selector: 'app-company-dashboard',
	templateUrl: './company-dashboard.component.html',
	styleUrls: ['./company-dashboard.component.css']
})


export class CompanyDashboardComponent implements OnInit {
	item: FirebaseListObservable<any>;
	temp = [];
	appliedStuData = [];
	jobskeys = [];
	appliedStuKeys = [];
	forCompareCompanyId = [];
	companyKey;
	inApplyStdCompKey = [];
	companyDataArray = [];
	getCompanyKey: FirebaseObjectObservable<any>;
	getStudentAppliedId: FirebaseListObservable<any>;
	showCompanyJobs: FirebaseListObservable<any>;
	fetchStudentCV: FirebaseListObservable<any>;
	arr = [];
	appState = 'default';
	studentCVUid;
	studentUidInApplicants;
	studentCV_Val;
	studentCV_Arr = []

	tableHeader = ['Job Title', 'Description', 'View All Candidates']

	constructor(private location: Location, private router: Router, private authService: AuthService, private afAuth: AngularFireAuth, private db: AngularFireDatabase) {
		this.getList();
		this.showJobs();
}

	ngOnInit() { }
	showJobs() {
		this.showCompanyJobs = this.db.list('jobsByCompanies' + "/" + this.afAuth.auth.currentUser.uid, { preserveSnapshot: true });
		this.showCompanyJobs.subscribe(snapshots => {
			snapshots.forEach(snapshot => {
				console.log(snapshot.key)
				console.log(snapshot.val());
				this.companyDataArray.push(snapshot.val());
				console.log(this.companyDataArray);
			})
		})
	}

	getList() {
		this.item = this.db.list('jobsByCompanies/' + this.afAuth.auth.currentUser.uid, { preserveSnapshot: true })
		this.item
			.subscribe(snapshots => {
				snapshots.forEach(snapshot => {

					this.jobskeys.push(snapshot.key)
					//jobs keys
					console.log(snapshot.key)
					// console.log(snapshot.val())

					//wo students jinho ne apply kara ha
					snapshot.forEach((data) => {
						if (data.key == 'appliedByStudent') {
							console.log("data.key " + data.key)

							this.temp.push(data.val())
							console.log("data.val() " + data.val())
							for (let a in this.temp) {
								console.log(this.temp[0])
							}

							data.forEach((data) => {
								console.log(data.key); //appliedByStudent keys
								this.appliedStuKeys.push(data.key);
								this.appliedStuData.push(data.val())
								console.log(this.appliedStuData);
								this.appliedStuData.forEach((data) => {
									this.forCompareCompanyId.push(data.id);
								});
								console.log("this.forCompareCompanyId " + this.forCompareCompanyId);
								console.log("this.appliedStuData " + this.appliedStuData);
								console.log("this.appliedStuKeys " + this.appliedStuKeys);
								console.log("this.jobskeys " + this.jobskeys);
								this.appliedStuKeys.forEach((id, i) => {
									console.log(id);

								})

							})
						}

					})

				});
			})


	}
	viewCandidates(title) {
		this.studentCV_Arr = [];
        this.appState = 'showCV'
		// get company key
		this.getCompanyKey = this.db.object('jobsByCompanies', { preserveSnapshot: true });
		this.getCompanyKey.subscribe(snapshots => {
			snapshots.forEach(snapshot => {
				console.log(snapshot.key)
				console.log(snapshot.val());

				snapshot.forEach((param) => {
					console.log(param.key);
					console.log(param.val());
					this.companyKey = param.key

				})
			});
		});

		//    now getting student Applied id
		this.getStudentAppliedId = this.db.list('appliedByStudent', { preserveSnapshot: true });
		this.getStudentAppliedId.subscribe(snapshots => {
			this.arr = [];
			console.log(this.arr)
			snapshots.forEach(snapshot => {
				console.log(snapshot.key)
				console.log(this.companyKey)
				console.log(snapshot.val());
				this.studentUidInApplicants = snapshot.val()
				console.log('title', title);
				console.log('id', snapshot.val().jobTitle);
				if (title == snapshot.val().jobTitle) {

					this.fetchStudentCV = this.db.list('/students-CV', { preserveSnapshot: true });
					this.fetchStudentCV
						.subscribe(cvdata => {
							this.studentCV_Arr = [];
							cvdata.forEach(element => {
								console.log(element.key);
								console.log(snapshot.val());

								this.studentCVUid = element.key;
								this.studentCV_Val = element.val();
								console.log(snapshot.val().studentUid);
								console.log(this.studentCVUid);


								if (this.studentCVUid == snapshot.val().studentUid) {

									console.log(this.studentCV_Val);
									this.studentCV_Arr.push(this.studentCV_Val)

								}
								console.log(snapshot.val());


							});


						});


				}

				this.inApplyStdCompKey.push(snapshot.val().jobTitle);
			})
			console.log(this.companyKey);
			console.log(this.inApplyStdCompKey);
		});
	

}
	back() {
		this.appState = "default";

	}
	signOut() {
		this.authService.signOut()
	}

}


