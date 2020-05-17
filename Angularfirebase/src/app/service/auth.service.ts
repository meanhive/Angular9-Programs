import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'; // web service
import { AngularFireAuth } from '@angular/fire/auth'; // credential for auth
import { User } from 'firebase'; // data model username and password
import { Router } from '@angular/router'; // use for navigation

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // ref for model
  userData: Observable<User>;
  // ref for libraries
  constructor(private fireAuth: AngularFireAuth, private route: Router) {
    // auth state to ref model
    this.userData = this.fireAuth.authState;
  }

  // logic for signUp
  signUpUser(data: any) {
    this.fireAuth
      .createUserWithEmailAndPassword(data.username, data.password)
      .then((result) => {
        // custom alert
        localStorage.setItem('message', 'Successfully created user');
        localStorage.setItem('code', '200');
        // navigation
        this.route.navigate(['/login']);
      })
      .catch((err) => {
        console.log(err);
        if (err.code === 'auth/email-already-in-use') {
          this.route
            .navigateByUrl('/', { skipLocationChange: true })
            .then(() => {
              this.route.navigate(['/signUp']);
            });
          localStorage.setItem('message', err.message);
          localStorage.setItem('code', '400');
        }
        if (err.code === 'auth/weak-password') {
          this.route
            .navigateByUrl('/', { skipLocationChange: true })
            .then(() => {
              this.route.navigate(['/signUp']);
            });
          localStorage.setItem('message', err.message);
          localStorage.setItem('code', '400');
        }
      });
  }

  // logic for login
  loginUser(data: any) {
    this.fireAuth
      .signInWithEmailAndPassword(data.username, data.password)
      .then((result) => {
        // custom alert
        localStorage.setItem('message', 'Successfully login');
        localStorage.setItem('code', '200');
        this.route.navigate(['/dashboard']);
      })
      .catch((err) => {
        console.log(err.u);
        if (err.code === 'auth/user-not-found') {
          this.route
            .navigateByUrl('/signUp', { skipLocationChange: true })
            .then(() => {
              this.route.navigate(['/login']);
            });
          localStorage.setItem('message', err.message);
          localStorage.setItem('code', '400');
        }
        if (err.code === 'auth/wrong-password') {
          this.route
            .navigateByUrl('/signUp', { skipLocationChange: true })
            .then(() => {
              this.route.navigate(['/login']);
            });
          localStorage.setItem('message', err.message);
          localStorage.setItem('code', '400');
        }
      });
  }

  // forgot password
  forgotPassword(data: any) {
    this.fireAuth
      .sendPasswordResetEmail(data.username)
      .then((result) => {
        // custom alert
        localStorage.setItem(
          'message',
          'Password verification sent to email successfully.'
        );
        localStorage.setItem('code', '200');
      })
      .catch((err) => {
        console.log(err);
        if (err.code === 'auth/user-not-found') {
          this.route
            .navigateByUrl('/', { skipLocationChange: true })
            .then(() => {
              this.route.navigate(['/forgot-password']);
            });
          localStorage.setItem('message', err.message);
          localStorage.setItem('code', '400');
        }
      });
  }

  //sending verification email
  sendingVerification(curUser: any) {}

  //logout logic
  logOut() {
    this.fireAuth
      .signOut()
      .then((result) => {
        // custom alert
        localStorage.setItem('message', 'Successfully Logout');
        localStorage.setItem('code', '200');
        this.route.navigate(['/login']);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
