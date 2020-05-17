import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  constructor(private auth: AuthService) {}

  ngOnInit(): void {}

  submitHandler(data: any) {
    console.log('SignUp', data);
    this.auth.signUpUser(data);
  }
}
