import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { HttpClient } from '@angular/common/http';
import { SeriesOptionsType } from 'highcharts';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
})
export class LineChartComponent implements OnInit {
  products: any;
  productNames: string[] = [];
  xLabels: string[] = [];
  lineChart: Chart = new Chart();
  previewBeerDataSeries: SeriesOptionsType[] = [];
  chartOptions: any;

  constructor(public http: HttpClient) {}
  ngOnInit(): void {
    this.http
      .get('../../assets/jsonfiles/line-chart-data.json')
      .subscribe((res) => {
        this.products = res;
        this.productNames = Object.keys(this.products);

        let grayShades = 0;
        let previewData = 1;
        for (let owner of this.products.beer) {
          let previewLineData: SeriesOptionsType = {
            name: '',
            type: 'line',
            data: [],
            color: '',
            marker: {
              symbol: 'circle',
              radius: 2.5,
            },
          };

          let name = 'BEER|' + owner.company.toUpperCase();
          previewLineData.name = name;

          previewLineData.color = `rgb(${110 + grayShades}, ${
            110 + grayShades
          }, ${110 + grayShades})`;

          for (let intervalSale of owner.revenueOfAWeekInterval) {
            previewLineData.data!.push(previewData);
          }
          this.previewBeerDataSeries.push(previewLineData);
          grayShades += 10;
          if (grayShades === 120) {
            grayShades = 0;
          }
          previewData = 1.5 * previewData;
        }

        for (let xlabel of this.products.beer[0].revenueOfAWeekInterval) {
          this.xLabels.push('1w/e ' + xlabel.date);
        }

        this.chartOptions = {
          chart: {
            type: 'line',
          },
          credits: {
            enabled: false,
          },
          title: {
            text: null,
          },
          xAxis: {
            labels: {
              style: {
                fontSize: '12px',
              },
            },
            categories: this.xLabels,
            lineWidth: 0,
          },
          yAxis: {
            title: {
              text: '$',
              style: {
                fontSize: '15px',
                color: '#262626',
                fontWeight: '700',
              },
            },
            gridLineWidth: 0,
            labels: {
              style: {
                fontSize: '12px',
              },
              formatter: function () {
                return '##';
              },
            },
          },
          series: this.previewBeerDataSeries,
          tooltip: {
            formatter: function () {
              return '##';
            },
          },
          plotOptions: {
            line: {
              lineWidth: 1.5,
            },
          },
          legend: {
            itemMarginBottom: 5,
            itemStyle: {
              fontSize: '12px',
              color: '#262626',
            },
            itemHoverStyle: {
              backgroundColor: '#f0f0f0',
            },
          },
        };
        this.lineChart = new Chart(this.chartOptions);
      });
  }
}
