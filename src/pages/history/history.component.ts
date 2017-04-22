import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { TemperatureService } from '../../services/temperature.service';
import { NoiseService } from '../../services/noise.service';

@Component({
  selector: 'history',
  templateUrl: 'history.component.html'
})
export class HistoryComponent implements OnInit {
  type: string;
  history: Array<any>;

  constructor (
    private route: ActivatedRoute,
    private temperatureService: TemperatureService,
    private noiseService: NoiseService,
  ) {}

  ngOnInit () {
    this.route.queryParams
      .subscribe(params => {
        this.type = params.type;
        this.history = this.loadHistory(params.type);
      });
  }

  private loadHistory (type: string) {
    switch (type) {
      case 'temperature': return this.temperatureService.history;
      default: return this.noiseService.history;
    }
  }
}
