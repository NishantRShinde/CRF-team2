import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LinechartDataServiceService } from '../services/linechart-data-service.service';
import { Chart } from 'highcharts';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
})
export class LineChartComponent implements OnInit {
  @Input() lineChart: any;
  constructor(public lineChartDataService: LinechartDataServiceService) {}
  ngOnInit(): void {}

  showActualData() {}
}
