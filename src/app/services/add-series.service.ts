import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Seria } from '../models/seria';

@Injectable({
  providedIn: 'root'
})
export class AddSeriesService {

  constructor(
    private http: HttpClient,
  ) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('localJWT')).jwt
    })
  };

  private endpoint = '/serii'
  private hostname = 'http://aws-backend-ipapp.eba-g7bht3us.eu-central-1.elasticbeanstalk.com';

  postSeries(seria: Seria): Observable<Seria>{
    console.log(JSON.stringify(seria));
    return this.http.post(this.hostname + this.endpoint, JSON.stringify(seria), this.httpOptions) as Observable<Seria>;
  }


}
