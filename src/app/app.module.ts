import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import 'rxjs';

import { AppComponent } from './app.component';

import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { DashboardCardComponent } from '../components/dashboard-card/dashboard-card.component';

import { TemperatureService } from '../services/temperature.service';
import { NoiseService } from '../services/noise.service';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    DashboardCardComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    TemperatureService,
    NoiseService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
