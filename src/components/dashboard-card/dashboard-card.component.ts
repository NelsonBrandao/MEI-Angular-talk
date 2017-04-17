import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'dashboard-card',
  templateUrl: 'dashboard-card.component.html',
  styleUrls: ['./dashboard-card.component.css']
})

export class DashboardCardComponent {
  @Input() title: string;
  @Input() value: number;

  constructor () {}
}
