import { UserService } from './../../services/user.service';
import { UserForm } from 'src/app/models/userForm';
import { LoginServiceService } from './../../services/login-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  currentPassword = '';
  newPassword1 = '';
  newPassword2 = '';
  error = false;
  success = false;
  currentUser: UserForm;

  constructor(
    private loginService: LoginServiceService,
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.loginService.getCurrentUser()
                      .then((user: UserForm) => {
                        this.currentUser = user;
                      });
  }

  changePassword() {
    this.error = false;
    this.success = false;
    const pass = this.currentUser.password;
    if (pass !== this.currentPassword || this.newPassword1 !== this.newPassword2) {
      this.error = true;
      return;
    }
    this.currentUser.password = this.newPassword2;
    this.userService.updateUser(this.currentUser)
                    .subscribe((user: UserForm) => {
                      this.success = true;
                      console.log(user);
                    });
  }

}
