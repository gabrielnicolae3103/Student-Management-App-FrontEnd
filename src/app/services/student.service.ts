import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StudentForm } from '../models/studentForm';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

constructor(private http: HttpClient) {}

httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('localJWT')).jwt
  })
};



private endpoint = '/students';
private hostname = 'http://aws-backend-ipapp.eba-g7bht3us.eu-central-1.elasticbeanstalk.com';

getStudents(): Observable<StudentForm[]>{
  return this.http.get(this.hostname + this.endpoint, this.httpOptions) as Observable<StudentForm[]>;
}

getStudentByUsername(username: string): Observable<StudentForm> {
  return this.http.get(this.hostname + this.endpoint + '/username/' + username, this.httpOptions) as Observable<StudentForm>;
}

}
