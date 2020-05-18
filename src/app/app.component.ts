import { LoginServiceService } from './services/login-service.service';
import { UserForm } from './models/userForm';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  currentUser: UserForm;
  checkStudent = false;

  constructor(
      private router: Router,
      private authenticationService: LoginServiceService
  ) {
  }
  ngOnInit(): void {
    this.authenticationService.getCurrentUser()
    .then(x => {
      this.currentUser = x;
      this.checkStudentF();
    });
  }

  logout() {
      this.authenticationService.logout();
      this.router.navigate(['/login']);
  }

  goHome() {
    this.router.navigate(['']);
  }

  showNavBar() {
    return this.authenticationService.jwt;
  }

  datePersonale() {
    this.router.navigateByUrl('/personal-info');
  }

  changePassword() {
    this.router.navigateByUrl('/change-password');
  }

  studentGrades() {
    this.router.navigateByUrl('/view-grades');
  }

  checkStudentF() {
    this.checkStudent = this.currentUser.userType.type === 'STUDENT';
  }

  getCurrentUser() {
    return this.currentUser;
  }
}
