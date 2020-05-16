import { UserForm } from 'src/app/models/userForm';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StudentForm } from '../models/studentForm';

@Injectable({
  providedIn: 'root'
})
export class UserService {

constructor(private http: HttpClient) { }



private endpoint = '/users';
private hostname = 'http://aws-backend-ipapp.eba-g7bht3us.eu-central-1.elasticbeanstalk.com';
private hostname2 = 'http://localhost:8080';

getUsers(): Observable<UserForm[]>{
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('localJWT')).jwt
    })
  };
  return this.http.get(this.hostname + this.endpoint, httpOptions) as Observable<UserForm[]>;
}

getUserByUsername(username: string): Observable<UserForm> {
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('localJWT')).jwt
    })
  };
  return this.http.get(this.hostname + this.endpoint + '/login/' + username, httpOptions) as Observable<UserForm>;
}

}
