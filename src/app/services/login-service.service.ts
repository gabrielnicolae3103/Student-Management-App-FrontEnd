import { UserForm } from './../models/userForm';
import { UserService } from './user.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders }    from '@angular/common/http';
import { LoginCrd } from 'src/app/models/loginCredentials';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { StudentForm } from 'src/app/models/studentForm';
import {GlobalConstants} from 'src/app/common/globalConstants';
import { JsonPipe } from '@angular/common';
import jwt_decode from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  constructor(
    private http: HttpClient,
    private userService: UserService
  ) {
    if (localStorage.getItem('localJWT')) {
      this.jwt = localStorage.getItem('localJWT');
    }
  }

  jwt: any;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };

  private endpoint = '/login';
  private hostname = 'http://aws-backend-ipapp.eba-g7bht3us.eu-central-1.elasticbeanstalk.com';
  private hostname2 = 'http://localhost:8080';

  postLogin(login: LoginCrd): Observable<Object>{
    return this.http.post(this.hostname + this.endpoint, JSON.stringify(login), this.httpOptions);
  }

  getStudent() {
    const httpOptions1 = {
    headers: new HttpHeaders({
      Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('localJWT')).jwt
    })
  };
    return this.http.get(this.hostname + '/students', httpOptions1) as Observable<StudentForm[]>;
  }

  async getCurrentUser(): Promise<UserForm> {
    if (!this.jwt) {
      return;
    }
    const username = jwt_decode(JSON.parse(localStorage.getItem('localJWT')).jwt).sub;
    let currentUser;
    await this.userService.getUserByUsername(username).toPromise().then(user => {
      currentUser = user;
    });
    return currentUser;
  }

  logout(): void {
    localStorage.removeItem('localJWT');
    this.jwt = undefined;
  }
}
