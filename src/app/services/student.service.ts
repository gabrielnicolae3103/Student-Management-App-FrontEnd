import { StudentFormComponent } from './../components/studentForm/studentForm.component';
import { UserForm } from './../models/userForm';
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
private hostname2 = 'http://localhost:8080';

getStudents(): Observable<StudentForm[]>{
  return this.http.get(this.hostname + this.endpoint, this.httpOptions) as Observable<StudentForm[]>;
}

getStudentByUsername(username: string): Observable<StudentForm> {
  return this.http.get(this.hostname + this.endpoint + '/username/' + username, this.httpOptions) as Observable<StudentForm>;
}

getStudentById(id: number): Observable<StudentForm> {
  return this.http.get(this.hostname + this.endpoint + '/' + id, this.httpOptions) as Observable<StudentForm>;
}

updateStudent(student: StudentForm): Observable<StudentForm> {
  return this.http.put(this.hostname + this.endpoint + '/' + student.user.id,
                        JSON.stringify(student),
                        this.httpOptions) as Observable<StudentForm>;
}

}
