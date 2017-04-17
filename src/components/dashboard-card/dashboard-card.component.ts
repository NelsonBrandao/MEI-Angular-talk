import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'dashboard-card',
  templateUrl: 'dashboard-card.component.html',
  styleUrls: ['./dashboard-card.component.css']
})

export class DashboardCardComponent {
  @Input() title: string;
  @Input() value: number;
  @Output() onRefresh = new EventEmitter();

  constructor () {}

  onRefreshClicked () {
    this.onRefresh.emit();
  }
}
