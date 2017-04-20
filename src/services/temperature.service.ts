import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class TemperatureService {
  history: Array<Object> = [];

  constructor (
    private http: Http,
  ) {}

  getCurrentTemperature () {
    return this.http
      .get('http://localhost:3000/currentTemperature')
      .map(response => response.json())
      .toPromise()
      .then(response => {
        this.history.push({
          time: new Date(),
          value: response.temperature,
        });

        return response;
      })
    ;
  }
}
