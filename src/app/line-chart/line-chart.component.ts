import { Component, Input } from '@angular/core';
import { LinechartDataServiceService } from '../services/linechart-data-service.service';
import { Chart } from 'highcharts';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
})
export class LineChartComponent {
  @Input() lineChart: any;
  constructor(public lineChartDataService: LinechartDataServiceService) {}
}
