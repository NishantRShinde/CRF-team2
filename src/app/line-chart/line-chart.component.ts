import { Component, OnInit } from '@angular/core';
import { LinechartDataServiceService } from '../services/linechart-data-service.service';


@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
})
export class LineChartComponent implements OnInit {

  constructor(public lineChartDataService:LinechartDataServiceService) {}
  ngOnInit(): void {
    
  }
}
