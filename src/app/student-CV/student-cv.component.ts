import { Component, OnInit } from '@angular/core';
import { AuthService } from ".././auth-service.service";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
	constructor(private authService: AuthService, private fb: FormBuilder) { }

	ngOnInit() {
		this.studentCV_Form = this.fb.group({
			'fullName'    : '',
			'CNIC'        : '',
			'mobile'      : '',
			'description' : '',
			'genderOptions': '',
			'preferredIndustry' : "",
			'$key' : ''
				})
	}
	submit(){
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
