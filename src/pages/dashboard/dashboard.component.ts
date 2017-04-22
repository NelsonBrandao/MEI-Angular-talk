import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { TemperatureService } from '../../services/temperature.service';
import { NoiseService } from '../../services/noise.service';1

@Component({
  selector: 'dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  autoRefreshActive: boolean;
  currentTemperature: number;
  currentNoise: number;
  temperatureHistory: Array<Object>;
  noiseHistory: Array<Object>;

  private intervalId: any;

  constructor (
    private router: Router,
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

  goToFullHistory (type: string) {
    console.log(type);
    this.router.navigate(['/history'], { queryParams: { type: type } });
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
      .then(() => this.temperatureHistory = this.temperatureService.history)
    ;
  }

  private updateNoise () {
    this.noiseService.getCurrentNoise()
      .then(response => this.currentNoise = response.noise)
      .then(() => this.noiseHistory = this.noiseService.history)
    ;
  }
}
