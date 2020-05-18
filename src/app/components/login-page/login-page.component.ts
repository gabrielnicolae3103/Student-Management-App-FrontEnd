import { AppComponent } from './../../app.component';
import { Component, OnInit, Input } from '@angular/core';
import { LoginCrd } from 'src/app/models/loginCredentials';
import {MatButtonModule} from '@angular/material/button';
import { Observable } from 'rxjs';
import { LoginServiceService} from '../../services/login-service.service';
import { Router } from '@angular/router';
import { GlobalConstants } from 'src/app/common/globalConstants';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  constructor(
    private loginService: LoginServiceService,
    private router: Router,
    private app: AppComponent
  ) { }

  login: LoginCrd = {} as any;
  error = false;
  ngOnInit(): void {
    this.login.username = '',
    this.login.password = '';
  }

  submitUser(): void{
    this.error = false;
    this.loginService.postLogin(this.login).subscribe((jwt) => {
      console.log('login');
      localStorage.setItem('localJWT', JSON.stringify(jwt)),
      this.loginService.jwt = JSON.stringify(jwt);
      console.log(JSON.parse(localStorage.getItem('localJWT')));
      this.app.ngOnInit(); // reinitialize
      this.router.navigateByUrl('/');
      },
      (error) => {
        this.error = true;
      });
  }
}
