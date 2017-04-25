import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class NoiseService {
  history: Array<Object> = [];
  private updateSubject = new Subject();

  constructor (
    private http: Http,
  ) {}

  getCurrentNoiseObservable () {
    return Observable.merge(
      this.fetchCurrentNoise(),
      this.updateSubject.flatMap(() => this.fetchCurrentNoise())
    );
  }

  updateCurrentNoise () {
    this.updateSubject.next();
  }

  private fetchCurrentNoise () {
    return this.http
      .get('http://localhost:3000/currentNoise')
      .map(response => response.json())
      .map(response => response.noise)
      .do(noise => this.history.push({
        time: new Date(),
        value: noise,
      }))
    ;
  }
}
