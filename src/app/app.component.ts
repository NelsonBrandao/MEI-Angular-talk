import { Component, OnInit } from '@angular/core';

import { TemperatureService } from '../services/temperature.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app works!';

  constructor (
    private temperatureService: TemperatureService,
  ) {}

  ngOnInit () {
    this.temperatureService.getCurrentTemperature()
      .then(console.log)
    ;
  }
}
