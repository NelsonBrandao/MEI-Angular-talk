import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {

  constructor () {}

  get (key, defaultValue = null) {
    if (!localStorage[key]) {
      return defaultValue;
    }

    return JSON.parse(localStorage[key]);
  }

  save (key, value) {
    localStorage[key] = JSON.stringify(value);

    return value;
  }
}
