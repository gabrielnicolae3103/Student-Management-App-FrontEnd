import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders }    from '@angular/common/http';
import { Observable } from 'rxjs';
import {Faculty} from 'src/app/models/faculty'

@Injectable({
  providedIn: 'root'
})
export class AddNewFacultyService {

  constructor(
    private http: HttpClient,
  ) { }


  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('localJWT')).jwt
    })
  };

  private endpoint = '/faculties'
  private hostname = 'http://aws-backend-ipapp.eba-g7bht3us.eu-central-1.elasticbeanstalk.com';

  postFaculty(faculty: Faculty): Observable<Object>{
    return this.http.post(this.hostname + this.endpoint, JSON.stringify(faculty), this.httpOptions);
  }

}
