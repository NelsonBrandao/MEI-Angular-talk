import { Component, OnInit } from '@angular/core';

import { TemperatureService } from '../../services/temperature.service';

@Component({
  selector: 'current-temperature',
  templateUrl: 'current-temperature.component.html',
  styleUrls: ['./current-temperature.component.css']
})

export class CurrentTemperatureComponent implements OnInit {
  currentTemperature: number;

  constructor (
    private temperatureService: TemperatureService,
  ) {}

  ngOnInit () {
    this.temperatureService.getCurrentTemperature()
      .then(response =>  this.currentTemperature = response.temperature)
    ;
  }
}
