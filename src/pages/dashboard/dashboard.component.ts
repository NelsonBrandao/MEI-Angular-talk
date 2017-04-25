import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

import { TemperatureService } from '../../services/temperature.service';
import { NoiseService } from '../../services/noise.service';

const AUTO_UPDATE_INTERVAL = 1000 * 1;

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

  private autoUpdateSub: Subscription;

  constructor (
    private router: Router,
    private temperatureService: TemperatureService,
    private noiseService: NoiseService,
  ) {}

  ngOnInit () {
    this.temperatureService
      .getCurrentTemperatureObservable()
      .do(() => this.temperatureHistory = this.temperatureService.history)
      .subscribe(temperature => this.currentTemperature = temperature)
    ;

    this.noiseService
      .getCurrentNoiseObservable()
      .do(() => this.noiseHistory = this.noiseService.history)
      .subscribe(noise => this.currentNoise = noise)
    ;
  }

  toggleAutoRefresh () {
    this.autoRefreshActive = !this.autoRefreshActive;

    this.setupAutoRefresh();
  }

  onRefreshTemperature () {
    this.temperatureService.updateCurrentTemperature();
  }

  onRefreshNoise () {
    this.noiseService.updateCurrentNoise();
  }

  goToFullHistory (type: string) {
    this.router.navigate(['/history'], { queryParams: { type: type } });
  }

  private setupAutoRefresh () {
    if (this.autoRefreshActive) {

      this.autoUpdateSub = Observable.timer(0, AUTO_UPDATE_INTERVAL)
        .do(() => this.temperatureService.updateCurrentTemperature())
        .do(() => this.noiseService.updateCurrentNoise())
        .subscribe()
      ;
    } else if (this.autoUpdateSub) {
      this.autoUpdateSub.unsubscribe();
    }
  }
}
