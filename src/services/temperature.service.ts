import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class TemperatureService {
  constructor (
    private http: Http,
  ) {}

  getCurrentTemperature () {
    return this.http
      .get('http://localhost:3000/currentTemperature')
      .map(response => response.json())
      .toPromise()
    ;
  }
}
