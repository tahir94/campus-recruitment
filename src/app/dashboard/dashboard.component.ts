import { Component, OnInit } from '@angular/core';
import {AuthService } from ".././auth-service.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers : [AuthService]
})
export class DashboardComponent implements OnInit {

  constructor(private authService: AuthService,) { }

  ngOnInit() {
  }

  signOut(){
    this.authService.signOut();
  }

}
