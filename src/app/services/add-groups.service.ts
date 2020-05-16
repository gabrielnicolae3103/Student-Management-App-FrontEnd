import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Major } from '../models/major';
import { Seria } from '../models/seria';
import { Grupa } from '../models/grupa';

@Injectable({
  providedIn: 'root'
})
export class AddGroupsService {

  constructor(
    private http: HttpClient,
  ) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('localJWT')).jwt
    })
  };

  private endpointMajors = '/majors';
  private endpointSeries = '/serii';
  private endpointGroups = '/grupe';
  private hostname = 'http://aws-backend-ipapp.eba-g7bht3us.eu-central-1.elasticbeanstalk.com';

  getMajors() {
    return this.http.get(this.hostname + this.endpointMajors, this.httpOptions) as Observable<Major[]>
  }

  getSeries(){
    return this.http.get(this.hostname + this.endpointSeries, this.httpOptions) as Observable<Seria[]>
  }

  postGrupa(grupa: Grupa): Observable<Grupa>{
    return this.http.post(this.hostname + this.endpointGroups, JSON.stringify(grupa), this.httpOptions) as Observable<Grupa>;
  }

  getGroups(): Observable<Grupa[]> {
    return this.http.get(this.hostname + this.endpointGroups, this.httpOptions) as Observable<Grupa[]>;
  }


}
