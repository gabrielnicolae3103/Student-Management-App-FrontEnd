import { Component, OnInit } from '@angular/core';
import { UserForm } from 'src/app/models/userForm';
import { Router } from '@angular/router';
import { LoginServiceService } from 'src/app/services/login-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  currentUser: UserForm;
  checkStudent = false;
  checkSecretary = false;

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
    this.checkSecretary = !this.checkStudent;
  }

  getCurrentUser() {
    return this.currentUser;
  }

  changeGrades() {
    this.router.navigateByUrl('/secretar');
  }

}
