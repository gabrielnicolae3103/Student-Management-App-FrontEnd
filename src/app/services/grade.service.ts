import { catchError } from 'rxjs/operators';
import { StudentForm } from './../models/studentForm';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { Class } from '../models/class';
import { Grade } from '../models/grade';

@Injectable({
  providedIn: 'root'
})
export class GradeService {

  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('localJWT')).jwt
    })
  };

  private endpoint = '/grades';
  private hostname = 'http://aws-backend-ipapp.eba-g7bht3us.eu-central-1.elasticbeanstalk.com';
  clasa: Class;
  student: StudentForm;
  getGradeByClassAndStudent(clasa: Class, student: StudentForm): Observable<Grade>{
    this.clasa = clasa;
    this.student = student;
    let error: HttpErrorResponse;
    return this.http
    .get<Grade>(this.hostname + this.endpoint + '/student/'
        + student.sin + '/class/' + clasa.id, this.httpOptions)
    .pipe(catchError(this.handleError('getGrade', clasa, student)));
  }

  private handleError(operation = 'operation', clasa: Class, student: StudentForm) {
    return (error: any): Observable<Grade> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      let grade: Grade = new Grade();
      grade.class = clasa;
      grade.student = student;
      grade.grade = 0;
      return of(grade as Grade);
    };
  }

}
