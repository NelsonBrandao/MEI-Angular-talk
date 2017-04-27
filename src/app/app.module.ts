import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import 'rxjs';

import { AppComponent } from './app.component';

import { DashboardComponent } from '../pages/dashboard/dashboard.component';
import { HistoryComponent } from '../pages/history/history.component';

import { DashboardCardComponent } from '../components/dashboard-card/dashboard-card.component';

import { FilterPipe } from '../pipes/filter.pipe';

import { TemperatureService } from '../services/temperature.service';
import { NoiseService } from '../services/noise.service';
import { StorageService } from '../services/storage.service';

const appRoutes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'history', component: HistoryComponent },
  { path: '**', pathMatch: 'full', redirectTo: '/' },
];

@NgModule({
  declarations: [
    AppComponent,

    DashboardComponent,
    HistoryComponent,

    DashboardCardComponent,

    FilterPipe,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [
    TemperatureService,
    NoiseService,
    StorageService,
  ],
  entryComponents: [
    DashboardComponent,
    HistoryComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
