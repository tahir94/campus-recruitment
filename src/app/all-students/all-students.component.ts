import { Component, OnInit } from '@angular/core';
import { AuthService } from ".././auth-service.service";
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
@Component({
	selector: 'app-all-students',
	templateUrl: './all-students.component.html',
	styleUrls: ['./all-students.component.css']
})
export class AllStudentsComponent implements OnInit {

	typeOfUser;
	StudentUserArray = []	;
	studentUsers: FirebaseListObservable<any>;
	constructor(private authService: AuthService, private db: AngularFireDatabase, private afAuth: AngularFireAuth, ) {


		this.studentUsers = db.list('/users', { preserveSnapshot: true });
		this.studentUsers
			.subscribe(snapshots => {
				snapshots.forEach(snapshot => {
					console.log(snapshot.key)
					console.log(snapshot.val().type)
					this.typeOfUser  = snapshot.val().type;
					console.log(this.typeOfUser);
					if(this.typeOfUser == 'student'){
						this.StudentUserArray.push(snapshot.val());
						console.log(this.StudentUserArray);

					}
					
				});
			})


	}

	ngOnInit() {
	}

	signOut() {
		this.authService.signOut();
	}

}
