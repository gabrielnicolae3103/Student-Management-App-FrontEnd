import { Component, OnInit, Input } from '@angular/core';
import { LoginCrd } from 'src/app/models/loginCredentials';
import {MatButtonModule} from '@angular/material/button';
import { Observable } from 'rxjs';
import { LoginServiceService} from '../../services/login-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  constructor(
    private loginService: LoginServiceService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.login.username = '',
    this.login.password = ''
  }

  login: LoginCrd = {} as any;

  private jwt: Object;

  submitUser(): void{
    this.router.navigateByUrl('/options')
    this.loginService.postLogin(this.login).subscribe((jwt) => {this.jwt = jwt, console.log(this.jwt)})
  }

}
