import { Component, OnInit } from '@angular/core';
import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from ".././auth-service.service";

@Component({
	selector: 'app-admin',
	templateUrl: './admin.component.html',
	styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
	studentType;
	companyType;
	isAdmin = true;
	studentsArray = [];
	companysArray = [];
	adminUid = true;
	companyUserKey;

	studensList: FirebaseListObservable<any>;
	companyList: FirebaseListObservable<any>;
	companyCompare: FirebaseListObservable<any>;
	accessjobByCompaniesUid: FirebaseListObservable<any>;
	accessAppliedByStudent: FirebaseListObservable<any>;
	constructor(private authService: AuthService, private afAuth: AngularFireAuth, private db: AngularFireDatabase, ) {

		// this.adminUid = this.afAuth.auth.currentUser.uid;
		// if (this.adminUid === 'ZDgEXsMZ2welZUf0am13n8lBLXI3') { 

		// }


		//getting students list
		this.studensList = db.list('/users', { preserveSnapshot: true });
		this.studensList
			.subscribe(snapshots => {
				snapshots.forEach(snapshot => {
					console.log(snapshot.key);
					this.companyType = snapshot.val().type;
					this.studentType = snapshot.val().type
					if (this.studentType == 'student') {

						this.studentsArray.push(snapshot.val())

					}
					else if (this.companyType == 'company') {
						this.companysArray.push(snapshot.val());
						console.log(this.companysArray);

					}

				});
			});






	}

	ngOnInit() {
	}
	removeCompany(companyEmail) {
		// remove company from users node
		this.companyCompare = this.db.list('/users', { preserveSnapshot: true });
		this.companyCompare
			.subscribe(snapshots => {
				snapshots.forEach(snapshot => {
					console.log(snapshot.key);
					this.companyUserKey = snapshot.key;
					console.log(snapshot.val().type);
					if (snapshot.val().type == 'company') {
						console.log(snapshot.val())
						if (snapshot.val().CompanyEmail == companyEmail) {
							console.log('you are on the right way !');
							this.companyCompare.remove(snapshot.key)
						}
						else {
							console.log('wrong !');

						}
					}
				});
			});

		//now remove company from jobsByCompanies node
		this.accessjobByCompaniesUid = this.db.list('/jobsByCompanies', { preserveSnapshot: true });
		this.accessjobByCompaniesUid
			.subscribe(snapshots => {
				snapshots.forEach(snapshot => {
					console.log(snapshot.key)
					console.log(snapshot.val());
					if (snapshot.key == this.companyUserKey) {
						this.accessjobByCompaniesUid.remove(this.companyUserKey)
					}


				});
			});

		//now remove from applicants node

		this.accessAppliedByStudent = this.db.list('/appliedByStudent', { preserveSnapshot: true });
		this.accessAppliedByStudent
			.subscribe(snapshots => {
				snapshots.forEach(snapshot => {
					console.log(snapshot.key)
					console.log(snapshot.val().id)
				});
			})
	}
	signOut() {
		this.authService.signOut();
	}

}
