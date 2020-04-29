import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders }    from '@angular/common/http';
import { LoginCrd } from 'src/app/models/loginCredentials';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { StudentForm } from 'src/app/models/studentForm';
import {GlobalConstants} from 'src/app/common/globalConstants';
import { JsonPipe } from '@angular/common';



@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  constructor(
    private http: HttpClient,
  ) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };




  httpOptions1 = {
    headers: new HttpHeaders({
      Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('localJWT')).jwt
    })
  };


  private endpoint = '/login';
  private hostname = 'http://aws-backend-ipapp.eba-g7bht3us.eu-central-1.elasticbeanstalk.com';
  private hostname2 = 'http://localhost:8080';
  
  postLogin(login: LoginCrd): Observable<Object>{
    return this.http.post(this.hostname + this.endpoint, JSON.stringify(login), this.httpOptions);
  }

  getStudent() {
    return this.http.get(this.hostname + '/students', this.httpOptions1) as Observable<StudentForm[]>
  }

  

}
