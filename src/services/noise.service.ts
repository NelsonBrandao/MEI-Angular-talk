import { Injectable } from '@angular/core';
import { Http } from '@angular/http'

@Injectable()
export class NoiseService {
  history: Array<Object> = [];

  constructor (
    private http: Http,
  ) {}

  getCurrentNoise () {
    return this.http
      .get('http://localhost:3000/currentNoise')
      .map(response => response.json())
      .toPromise()
      .then(response => {
        this.history.push({
          time: new Date(),
          value: response.noise,
        });

        return response;
      })
    ;
  }
}
