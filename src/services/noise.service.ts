import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable, Subject } from 'rxjs';

import { StorageService } from './storage.service';

const HISTORY_KEY = 'mei-demo/NOISE_HISTORY';

@Injectable()
export class NoiseService {
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
      .do(() => this.historySubject.next())
    ;
  }
}
