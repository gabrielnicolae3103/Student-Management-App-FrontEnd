import { Class } from './../models/class';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClassService {

  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('localJWT')).jwt
    })
  };

  private endpoint = '/classes';
  private hostname = 'http://aws-backend-ipapp.eba-g7bht3us.eu-central-1.elasticbeanstalk.com';

  getClasses(): Observable<Class[]>{
    return this.http.get(this.hostname + this.endpoint, this.httpOptions) as Observable<Class[]>;
  }

  getClassesByStudentYearAndMajor(year: number, majorId: number ): Observable<Class[]>{

    return this.http.get(this.hostname + this.endpoint + '/year/' + year + '/major/' + majorId, this.httpOptions) as Observable<Class[]>;
    
  }

}
