import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
})
export class AlertComponent implements OnInit {
  alertStatus = false;
  className: any;
  message = localStorage.getItem('message');
  code = localStorage.getItem('code');

  constructor() {}

  ngOnInit(): void {
    this.isStatus();
  }

  isStatus() {
    if (this.code === '200') {
      this.alertStatus = true;
      this.className = 'alert alert-success';
      // clear your alert msg
      setTimeout(() => {
        this.alertStatus = false;
        localStorage.removeItem('message');
        localStorage.removeItem('code');
      }, 5000);
    } else if (this.code === '400') {
      this.alertStatus = true;
      this.className = 'alert alert-danger';
      setTimeout(() => {
        this.alertStatus = false;
        localStorage.removeItem('message');
        localStorage.removeItem('code');
      }, 5000);
    }
  }
}
