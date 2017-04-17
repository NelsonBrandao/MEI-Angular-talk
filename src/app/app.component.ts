import { Component, OnInit } from '@angular/core';

import { TemperatureService } from '../services/temperature.service';
import { NoiseService } from '../services/noise.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  currentTemperature: number;
  currentNoise: number;

  constructor (
    private temperatureService: TemperatureService,
    private noiseService: NoiseService,
  ) {}

  ngOnInit () {
    this.updateTemperature();
    this.updateNoise();
  }

  onRefreshTemperature () {
    this.updateTemperature();
  }

  onRefreshNoise () {
    this.updateNoise();
  }

  private updateTemperature () {
    this.temperatureService.getCurrentTemperature()
      .then(response => this.currentTemperature = response.temperature)
    ;
  }

  private updateNoise () {
    this.noiseService.getCurrentNoise()
      .then(response => this.currentNoise = response.noise)
    ;
  }
}
