import { Secretary } from './../models/secretary';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SecretaryService {

  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('localJWT')).jwt
    })
  };



  private endpoint = '/secretaries';
  private hostname = 'http://aws-backend-ipapp.eba-g7bht3us.eu-central-1.elasticbeanstalk.com';
  private hostname2 = 'http://localhost:8080';


  async getSecretaryByUsername(username: string): Promise<Secretary> {
    return this.http.get(this.hostname + this.endpoint + '/username/' + username, this.httpOptions).toPromise() as Promise<Secretary>;
  }

  updateSecretary(secretary: Secretary): Observable<Secretary> {
    return this.http.put(this.hostname + this.endpoint + '/' + secretary.user.id,
                          JSON.stringify(secretary),
                          this.httpOptions) as Observable<Secretary>;
  }

}
