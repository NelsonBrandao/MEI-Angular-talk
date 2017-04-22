import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'dashboard-card',
  templateUrl: 'dashboard-card.component.html',
  styleUrls: ['./dashboard-card.component.css']
})

export class DashboardCardComponent {
  @Input() title: string;
  @Input() value: number;
  @Input() history: Array<Object>;
  @Output() onRefresh = new EventEmitter();
  @Output() onClick = new EventEmitter();

  constructor () {}

  onRefreshClicked () {
    this.onRefresh.emit();
  }

  goToFullHistory () {
    this.onClick.emit();
  }
}
