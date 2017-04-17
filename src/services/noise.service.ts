import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class NoiseService {
  constructor (
    private http: Http,
  ) {}

  getCurrentNoise () {
    return this.http
      .get('http://localhost:3000/currentNoise')
      .map(response => response.json())
      .toPromise()
    ;
  }
}
