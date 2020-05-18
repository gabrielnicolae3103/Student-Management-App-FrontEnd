import { Grade } from './../models/grade';
import { catchError, map } from 'rxjs/operators';
import { StudentForm } from './../models/studentForm';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of, forkJoin } from 'rxjs';
import { Class } from '../models/class';

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
  async getGradeByClassAndStudent(clasa: Class, student: StudentForm): Promise<Grade>{
    this.clasa = clasa;
    this.student = student;
    let error: HttpErrorResponse;
    return this.http
    .get<Grade>(this.hostname + this.endpoint + '/student/'
        + student.sin + '/class/' + clasa.id, this.httpOptions)
    .pipe(catchError(this.handleError('getGrade', clasa, student))).toPromise() as Promise<Grade>;
  }

  updateGrade(grade: Grade): Observable<Grade> {
    return this.http.put<Grade>(this.hostname + this.endpoint + '/student/' + grade.student.sin
                        + '/class/' + grade.clasa.id, grade, this.httpOptions);
  }

  updateGrades(grades: Grade[]): Observable<Grade[]> {
    let responses = grades.map((grade: Grade) => {
      return this.updateGrade(grade);
    });
    return forkJoin(responses);
  }

  private handleError(operation = 'operation', clasa2: Class, student: StudentForm) {
    return (error: any): Observable<Grade> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      let grade: Grade = new Grade();
      grade.clasa = clasa2;
      grade.student = student;
      grade.grade = 0;
      return of(grade as Grade);
    };
  }

}
