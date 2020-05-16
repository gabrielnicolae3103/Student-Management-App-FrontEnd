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

  constructor(
      private router: Router,
      private authenticationService: LoginServiceService
  ) {
  }
  ngOnInit(): void {
    this.authenticationService.getCurrentUser().then(x => this.currentUser = x);
  }

  logout() {
      this.authenticationService.logout();
      this.router.navigate(['/login']);
  }

  goHome() {
    this.router.navigate(['']);
  }
}
