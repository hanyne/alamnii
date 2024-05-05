import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  email: string = '';
  password: string = '';
  firstName: string = '';
  lastName: string = '';

  constructor(private auth: AuthService) { }

  ngOnInit(): void { }

  register() {
      if (this.email == '') {
          alert('Please enter email');
          return;
      }

      if (this.password == '') {
          alert('Please enter password');
          return;
      }

      if (this.firstName == '') {
          alert('Please enter first name');
          return;
      }

      if (this.lastName == '') {
          alert('Please enter last name');
          return;
      }

      this.auth.register(this.email, this.password, this.firstName, this.lastName);

      this.email = '';
      this.password = '';
      this.firstName = '';
      this.lastName = '';
  }
}
