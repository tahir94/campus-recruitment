import { Component, OnInit } from '@angular/core';
import { AngularFireDatabaseModule, FirebaseObjectObservable, AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import {AuthService } from ".././auth-service.service";

@Component({
	selector: 'app-company-dashboard',
	templateUrl: './company-dashboard.component.html',
	styleUrls: ['./company-dashboard.component.css']
})
export class CompanyDashboardComponent implements OnInit {
	item: FirebaseObjectObservable<any>;
	postJobData;
	postJobArray = []
	jobTitles = [];
	jobData = [];

	constructor(private authService: AuthService ,private afAuth: AngularFireAuth, private db: AngularFireDatabase, ) {
		this.item = this.db.object('/jobsByCompanies/' + this.afAuth.auth.currentUser.uid, { preserveSnapshot: true });
		this.item.subscribe((data) => {
			console.log(data.key);
			console.log(data.val());
			data.val().jobTitle;
			data.val().jobTitle;
			this.postJobData = data.val();
			console.log(this.postJobData)
			this.postJobArray.push(this.postJobData);
			for (let i = 0; i < this.postJobArray.length; i++) {
				console.log(this.postJobArray[i]);
				for (let a in this.postJobArray[i]) {
					console.log(this.postJobArray[i][a].jobTitle)
				 this.jobData.push(this.postJobArray[i][a].jobTitle);
				}
			}
			console.log(this.postJobArray)

		})
	}

	ngOnInit() {
	}
	signOut(){
    this.authService.signOut()		
	}

}






