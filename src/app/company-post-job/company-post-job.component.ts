import { Component, OnInit } from '@angular/core';
import { AuthService } from ".././auth-service.service";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
	selector: 'app-company-post-job',
	templateUrl: './company-post-job.component.html',
	styleUrls: ['./company-post-job.component.css']
})
export class CompanyPostJobComponent implements OnInit {
	postJobForm: FormGroup;
	companyUid;

	departments = [
		{ value: 'Accounts', viewValue: 'Accounts' },
		{ value: 'administration', viewValue: 'Administration' },
		{ value: 'custom_services', viewValue: 'Custom Services' },
		{ value: 'finance', viewValue: 'Finance' },
	]

	jobCategories = [
		{ value: 'administrative', viewValue: 'Administrative' },
		{ value: 'media', viewValue: 'Media' },
		{ value: 'autos', viewValue: 'Autos' },
		{ value: 'education', viewValue: 'Education' },
		{ value: 'electronics', viewValue: 'Electronics' },

	]

	jobTypes = [
		{ value: 'full_time', viewValue: 'Full Time' },
		{ value: 'intern', viewValue: 'Intern' },
		{ value: 'part_time', viewValue: 'Part Time' },
	]

	careerLevel = [
		{ value: 'entry_level', viewValue: 'Entry Level' },
		{ value: 'experienced', viewValue: 'Experienced' },
		{ value: 'student', viewValue: 'Student' },
	]

	newJob = 0;

	constructor(private afAuth: AngularFireAuth, private db: AngularFireDatabase, private authService: AuthService, private fb: FormBuilder) {
            this.companyUid = this.afAuth.auth.currentUser.uid
	console.log();
	
	 }

	ngOnInit() {
		this.postJobForm = this.fb.group({
			'jobTitle': '',
			'vacancies': '',
			'job_description': '',
			'departmentOptions': '',
			'jobCategoryOptions': '',
			'careerLevelOptions' : '',
			'jobTypeOptions': '',
			'salary': '',
			// '$key':''


		})
	}

	submit() {

		console.log(this.postJobForm.value);
		this.postJobForm.value.AppliedCompanyUid = this.companyUid;                         
		console.log(this.postJobForm.value)
		this.db.list('/jobsByCompanies/' +this.afAuth.auth.currentUser.uid).push(this.postJobForm.value)
		// this.newJob++
	}

	signOut(){
		this.authService.signOut()
	}

}
