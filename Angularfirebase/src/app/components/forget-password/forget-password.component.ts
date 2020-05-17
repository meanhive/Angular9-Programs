import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css'],
})
export class ForgetPasswordComponent implements OnInit {
  constructor(private auth: AuthService) {}

  ngOnInit(): void {}
  submitHandler(data: any) {
    console.log('forgot password', data);
    this.auth.forgotPassword(data);
  }
}
