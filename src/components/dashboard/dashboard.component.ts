import { Component, OnInit } from '@angular/core';

import { TemperatureService } from '../../services/temperature.service';
import { NoiseService } from '../../services/noise.service';1

@Component({
  selector: 'dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  currentTemperature: number;
  currentNoise: number;
  autoRefreshActive: boolean;
  intervalId: any;

  constructor (
    private temperatureService: TemperatureService,
    private noiseService: NoiseService,
  ) {}

  ngOnInit () {
    this.updateTemperature();
    this.updateNoise();

    this.setupAutoRefresh();
  }

  toggleAutoRefresh () {
    this.autoRefreshActive = !this.autoRefreshActive;

    this.setupAutoRefresh();
  }

  onRefreshTemperature () {
    this.updateTemperature();
  }

  onRefreshNoise () {
    this.updateNoise();
  }

  private setupAutoRefresh () {
    if (this.autoRefreshActive) {
      this.updateTemperature();
      this.updateNoise();

      this.intervalId = setInterval(() => {
        this.updateTemperature();
        this.updateNoise();
      }, 1000 * 30);
    } else {
      clearInterval(this.intervalId);
    }
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
