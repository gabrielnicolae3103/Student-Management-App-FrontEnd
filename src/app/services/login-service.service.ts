import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders }    from '@angular/common/http';
import { LoginCrd } from 'src/app/models/loginCredentials';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';


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


  private endpoint = '/login'
  private hostname = 'http://aws-backend-ipapp.eba-g7bht3us.eu-central-1.elasticbeanstalk.com'

  postLogin(login: LoginCrd): Observable<Object>{
    return this.http.post(this.hostname + this.endpoint, JSON.stringify(login), this.httpOptions);
  }

}
