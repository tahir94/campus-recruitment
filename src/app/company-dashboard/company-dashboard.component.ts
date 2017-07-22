import { Component, OnInit } from '@angular/core';
import { AngularFireDatabaseModule, FirebaseObjectObservable, AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from ".././auth-service.service";

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


	//
	companyKey;
	inApplyStdCompKey = [];
	companyDataArray  = [];
	getCompanyKey: FirebaseObjectObservable<any>;
	getStudentAppliedId: FirebaseListObservable<any>;
	showCompanyJobs: FirebaseListObservable<any>;
	arr = [];

	constructor(private authService: AuthService, private afAuth: AngularFireAuth, private db: AngularFireDatabase) {
		this.getList();
		this.showJobs();
	}

	ngOnInit() { }
	showJobs() {
		this.showCompanyJobs = this.db.list('jobsByCompanies' + "/" + this.afAuth.auth.currentUser.uid ,{ preserveSnapshot: true });
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
									// if(this.jobskeys[i] == this.forCompareCompanyId[i]){
									// 	console.log("compared jobs ids = " + id);
									// }
								})

							})
						}

					})

				});
			})


	}
	viewCandidates(title) {
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
				console.log(snapshot.val().id);
				if (title == snapshot.val().id) {
					alert('keys are match ! ');
					this.arr.push(snapshot.val())
					console.log(this.arr)

				}
				// else if (title != snapshot.val().id){
				// 	alert("keys not match!")
				// }
				this.inApplyStdCompKey.push(snapshot.val().id);
			})
			console.log(this.companyKey);
			console.log(this.inApplyStdCompKey);
		});
		console.log('outside 1', this.companyKey);
		console.log('outside 2', this.inApplyStdCompKey);
		// if(this.companyKey == this.inApplyStdCompKey){
		// 	alert("id's are match ")
		// }
		// else {
		// 	alert("sorry ! id's are not match ! ")
		// }
	}

}



/*
export class CompanyDashboardComponent implements OnInit {
	item: FirebaseObjectObservable<any>;
	postJobData;
	postJobArray = [];
	postArray = [];
	jobTitles = [];
	jobData = [];
	showStudentData = [];
	demo;
	keys;
	flag;
	h = 0;
	studentData;
	items: FirebaseListObservable<any>;
	getAppliedStudentData: FirebaseListObservable<any>;

	constructor(private authService: AuthService, private afAuth: AngularFireAuth, private db: AngularFireDatabase, ) {
		this.item = this.db.object('/jobsByCompanies/' + this.afAuth.auth.currentUser.uid, { preserveSnapshot: true });
		this.item.subscribe((data) => {

			console.log(data.key);
			console.log('data.val()',data.val());
			data.val().jobTitle;
			data.val().jobTitle;
			this.postJobData = data.val();
			console.log("1", this.postJobData)
			this.postJobArray.push(this.postJobData);
			for (let i = 0; i < this.postJobArray.length; i++) {
				console.log("2", this.postJobArray[i]);
				for (let a in this.postJobArray[i]){
					console.log("3", this.postJobArray[i][a]);
					this.postArray = this.postJobArray[i][a];
					console.log("4", this.postArray)
					if("appliedByStudent" in this.postJobArray[i][a])
					this.jobData.push(this.postJobArray[i][a].appliedByStudent);
					console.log("5", this.jobData);
				}
			}
			console.log(this.postJobArray)

		});
		console.log(this.authService.appliedStudentsArray);


		//set key in applied student node
		this.items = this.db.list('jobsByCompanies');
		this.items.subscribe((data) => {
			console.log(data);
			this.flag = 0;

			for (let i = 0; i < data.length; i++) {
				for (let k in data[i]) {
					for (let l in data[i][k]) {
						while (this.flag < 1) {
							console.log(data[i]);
							this.keys = Object.keys(data[i][k][l]);
							console.log(data[i][k][l]);
							this.studentData = data[i][k][l]
							console.log(this.keys);
							this.studentData.$key = this.keys;
							this.h++
							this.flag = 1;
						}

					}

				}

				// for(let a in data[i]){
				// 	console.log(data[i][a].appliedByStudent)
				// 	this.flag = 0;
				// 	while(this.flag < 1){
				// 		data[i][a].appliedByStudent.$key = this.keys[this.h];
				// 		console.log(data[i][a].appliedByStudent.$key)
				// 		this.h++
				// 			this.flag = 1;
				// 	}
				// 		this.showStudentData.push(data[i][a]);
				// 		console.log(this.showStudentData)

				// }

			}

			
			// this.showStudentData.push(this.studentData);
			this.jobData.push(this.studentData)
			console.log(this.jobData);
			console.log(this.jobData.length);
			for (let i = 0; i < this.jobData.length; i++) {
				console.log(this.jobData[i]);
			}

		})
	}

	ngOnInit() {
	}
/*
	viewAllCandidates() {
		this.getAppliedStudentData = this.db.list('jobsByCompanies/', {preserveSnapshot: true});
		this.getAppliedStudentData.subscribe((data) => {
			console.log(data);
			for (let i = 0; i < data.length; i++) {
				console.log(data[i]);
				for (let a in data[i]) {
					console.log(data[i][a].appliedByStudent.id)
				}
			}
		})


	}


viewAllCandidates(index, key) {
	console.log(index);
	
		
	this.getAppliedStudentData = this.db.list('jobsByCompanies/', {preserveSnapshot: true});
		this.getAppliedStudentData.subscribe((data) => {
			data.forEach(element => {
				console.log(element);
			});	
		})


	}
	signOut() {
		this.authService.signOut()
	}
	clicked(index, key) {
		console.log('index', index);
		console.log('key', key)
	}
	// showAppliedStudentData(){

	// }

	// demoOfOutput(outputData){
	// 	console.log(outputData)
	// }

}

*/