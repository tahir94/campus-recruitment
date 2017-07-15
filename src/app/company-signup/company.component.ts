import { Component, OnInit } from '@angular/core';
import {AuthService } from ".././auth-service.service";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css'],
  providers : [AuthService]
})
export class CompanyComponent implements OnInit {
CompanyForm : FormGroup;
xx;
  constructor(private authService: AuthService,private fb : FormBuilder) { }

  ngOnInit() {
	  this.CompanyForm = this.fb.group({
		  'CompanyName'      : "",
		   'CompanyEmail'    : "",
		    'CompanyPassword': ''	  
	  });
  }

  signup(){
	  this.CompanyForm.value
      this.authService.CompanySignup(this.CompanyForm.value);
  }
  
  
}
