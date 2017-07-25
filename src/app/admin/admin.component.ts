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
	AppliedStudentKey;
	studentUidInUsersNode;

	studensList: FirebaseListObservable<any>;
	companyList: FirebaseListObservable<any>;
	companyCompare: FirebaseListObservable<any>;
	accessjobByCompaniesUid: FirebaseListObservable<any>;
	accessAppliedByStudent: FirebaseListObservable<any>;
	accessUsersNode: FirebaseListObservable<any>;
	studentsCV_node: FirebaseListObservable<any>;
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

	removeStudent(studentEmail) {
		// remove company from users node
		console.log(studentEmail)
		this.accessUsersNode = this.db.list('/users', { preserveSnapshot: true });
		this.accessUsersNode
			.subscribe(snapshots => {
				this.studentsArray = [];
				snapshots.forEach(snapshot => {
					console.log(snapshot.key);
					console.log(snapshot.val());
					this.studentUidInUsersNode = snapshot.key;
					this.removeStudentFromUsers(this.studentUidInUsersNode)

					if (snapshot.val().type == 'student') {
						console.log(snapshot.val());
						if (snapshot.val().userEmail == studentEmail) {
							// this.accessUsersNode.remove(snapshot.key)
							console.log('remove student key !');

						}
					}
				});
			});


	}
	removeStudentFromUsers(key) {
 	// now remove student from student's cv
          console.log(key);
		  
		this.studentsCV_node = this.db.list('/students-CV', { preserveSnapshot: true });
		this.studentsCV_node
			.subscribe(snapshots => {
				snapshots.forEach(snapshot => {
					console.log(snapshot.key);
					console.log(this.studentUidInUsersNode)
					console.log(snapshot.val());
					if (snapshot.key == key) {
						console.log(snapshot.key);
    //                     console.log(key);
						

	// 					// console.log(this.studentUidInUsersNode);


						// this.studentsCV_node.remove(snapshot.key)
					}
				});
			})
	}

	removeCompany(companyEmail) {
		// remove company from users node
		this.companyCompare = this.db.list('/users', { preserveSnapshot: true });
		this.companyCompare
			.subscribe(snapshots => {
				this.companysArray = [];
				snapshots.forEach(snapshot => {
					console.log(snapshot.key);
					this.companyUserKey = snapshot.key;
					console.log(this.companyUserKey);

					this.removeAppliedStudentKey(this.companyUserKey);
					this.removejobsByCompanies(this.companyUserKey)
					console.log(snapshot.val().type);
					if (snapshot.val().type == 'company') {
						console.log(snapshot.val())
						if (snapshot.val().CompanyEmail == companyEmail) {
							console.log('you are on the right way !');
							// this.companyCompare.remove(snapshot.key)
						}
						else {
							console.log('wrong !');

						}
					}
				});
			});





	}
	removeAppliedStudentKey(key) {
		//now remove from applicants node
		this.accessAppliedByStudent = this.db.list('/appliedByStudent', { preserveSnapshot: true });
		this.accessAppliedByStudent
			.subscribe(snapshots => {
				snapshots.forEach(snapshot => {

					console.log(snapshot.key);
					this.AppliedStudentKey = snapshot.key
					console.log(snapshot.val().comapanyUid);

					let bb = snapshot.val().comapanyUid;

					console.log(key);

					if (bb == key) {
						console.log('key here');

						console.log(snapshot.val().comapanyUid);

						// this.accessAppliedByStudent.remove(snapshot.key);
					}

				});
			})
	}

	removejobsByCompanies(key) {
		//now remove company from jobsByCompanies node
		this.accessjobByCompaniesUid = this.db.list('/jobsByCompanies', { preserveSnapshot: true });
		this.accessjobByCompaniesUid
			.subscribe(snapshots => {
				this.companysArray = [];
				snapshots.forEach(snapshot => {
					console.log(snapshot.key);
					console.log(snapshot.val());
					let ApplicantsKey = snapshot.key;
					console.log(ApplicantsKey);
					console.log(key);


					// console.log(this.companyUserKey)
					if (ApplicantsKey == key) {
						// console.log(key);
						// console.log(ApplicantsKey);


						console.log('remove key');

						// this.accessjobByCompaniesUid.remove(ApplicantsKey)
					}


				});
			});

	}
	signOut() {
		this.authService.signOut();
	}

}
