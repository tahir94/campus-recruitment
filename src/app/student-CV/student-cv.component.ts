import { Component, OnInit } from '@angular/core';
import { AuthService } from ".././auth-service.service";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
@Component({
	selector: 'app-student-cv',
	templateUrl: './student-cv.component.html',
	styleUrls: ['./student-cv.component.css'],
	providers: [AuthService]
})
export class StudentCVComponent implements OnInit {

	// genderOptions;
	// preferredIndustryOptions;
	studentCV_Data;
	isSubmit = true;
	isSubmitDisabled;
	studentCV_key;
	checkedStudentCV_data: FirebaseListObservable<any>;
	studentCV_Form: FormGroup;


	genders = [
		{ value: 'male', viewValue: 'male' },
		{ value: 'female', viewValue: 'female' },

	];
	preferredIndustries = [
		{ value: 'civil Engineering', viewValue: 'civil Engineering' },
		{ value: 'civil Engineering', viewValue: 'Software Engineering' },
		{ value: 'Automobile', viewValue: 'Automobile' },
		{ value: 'Mass Communication', viewValue: 'Mass Communication' },

	]
	constructor(private afAuth : AngularFireAuth,private db: AngularFireDatabase, private authService: AuthService, private fb: FormBuilder) {
		this.checkedStudentCV_data = this.db.list('students-CV', { preserveSnapshot: true });
		this.checkedStudentCV_data.subscribe(snapshots => {
			snapshots.forEach(snapshot => {
				console.log(snapshot.key);
				this.studentCV_key = snapshot.key;
				console.log(snapshot.val());
				console.log(this.afAuth.auth.currentUser.uid);
				
				if(this.studentCV_key  == this.afAuth.auth.currentUser.uid){
					console.log(snapshot.key)
					
				  this.isSubmit = false;
				  this.isSubmitDisabled = true;
				//   alert('you already submitted CV !')
				}
								
			});
		})
	}

	ngOnInit() {
		this.studentCV_Form = this.fb.group({
			'fullName': '',
			'CNIC': '',
			'mobile': '',
			'description': '',
			'genderOptions': '',
			'preferredIndustry': "",
			'$key': ''
		})
	}
	submit() {
		this.authService.studentServiceData(this.studentCV_Form.value);

		// console.log('abcd')
		// this.studentCV_Data = this.studentCV_Form.value;
		//  console.log(this.studentCV_Data)
	}


	signOut() {
		this.authService.signOut();
	}



	// data() {
	// 	// console.log(this.preferredIndustryOptions);
	// }
}
