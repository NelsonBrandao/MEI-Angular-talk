import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Subject, Observable } from 'rxjs';

@Injectable()
export class TemperatureService {
  history: Array<Object> = [];

  private updateSubject = new Subject();

  constructor (
    private http: Http,
  ) {}

  getCurrentTemperatureObservable () {
    return Observable.merge(
      this.fetchCurrentTemperature(),
      this.updateSubject.flatMap(() => this.fetchCurrentTemperature()),
    );
  }

  updateCurrentTemperature () {
    this.updateSubject.next();
  }

  private fetchCurrentTemperature () {
    return this.http
      .get('http://localhost:3000/currentTemperature')
      .map(response => response.json())
      .map(response => response.temperature)
      .do(temperature => this.history.push({
        time: new Date(),
        value: temperature,
      }))
    ;
  }
}
