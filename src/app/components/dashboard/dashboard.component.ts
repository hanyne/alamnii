import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/shared/auth.service';
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  usersList: User[] = [];
  cin: string = '';
  email: string = '';
  fullName: string = '';
  job: string = '';
  phone: string = '';

  constructor(private auth: AuthService, private data: DataService, private router: Router) {}

  ngOnInit(): void {
   
  }

}
