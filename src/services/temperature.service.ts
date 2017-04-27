import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Subject, Observable } from 'rxjs';

import { StorageService } from './storage.service';

const HISTORY_KEY = 'mei-demo/TEMPERATURE_HISTORY';

@Injectable()
export class TemperatureService {
  history: Array<Object> = [];

  private updateSubject = new Subject();
  private historySubject = new Subject();

  constructor (
    private http: Http,
    private storage: StorageService,
  ) {
    this.history = this.storage.get(HISTORY_KEY, []);

    this.historySubject
      .debounce(() => Observable.timer(500))
      .subscribe(() => this.storage.save(HISTORY_KEY, this.history))
    ;
  }

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
      .do(() => this.historySubject.next())
    ;
  }
}
