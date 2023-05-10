import { Injectable } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { HttpClient } from '@angular/common/http';
import { SeriesOptionsType } from 'highcharts';
@Injectable({
  providedIn: 'root',
})
export class LinechartDataServiceService {
  products: any;
  productNames: string[] = [];
  xLabels: string[] = [];
  lineChart: Chart = new Chart();
  previewBeerDataSeries: SeriesOptionsType[] = [];
  actualBeerDataSeries: SeriesOptionsType[] = [];
  chartOptions: any;

  constructor(public http: HttpClient) {
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
          let actualLineData: SeriesOptionsType = {
            name: '',
            type: 'line',
            data: [],
            marker: {
              symbol: 'circle',
              radius: 3,
            },
          };

          let name = 'BEER|' + owner.company.toUpperCase();
          previewLineData.name = name;
          actualLineData.name = name;

          previewLineData.color = `rgb(${110 + grayShades}, ${
            110 + grayShades
          }, ${110 + grayShades})`;

          for (let intervalSale of owner.revenueOfAWeekInterval) {
            actualLineData.data!.push(intervalSale.sales);
            previewLineData.data!.push(previewData);
          }
          this.previewBeerDataSeries.push(previewLineData);
          this.actualBeerDataSeries.push(actualLineData);

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
            series: {
              cursor: 'pointer',
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

  createNewChart() {
    this.chartOptions.series = this.previewBeerDataSeries;
    this.chartOptions.yAxis.labels.formatter= function () {return '##';};
    this.chartOptions.tooltip.formatter=function () {return '##';};
    this.lineChart = new Chart(this.chartOptions);
    return this.lineChart;
  }
  renderLineChart() {
    this.chartOptions.series = this.actualBeerDataSeries;
    this.chartOptions.yAxis.labels.formatter = function () {
      const formattedValue = this.value.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      });
      return formattedValue;
    };

    this.chartOptions.tooltip.formatter = function () {
      const formattedValue = this.y.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      });
      return `<b>${formattedValue}<b>`;
    };
    return new Chart(this.chartOptions);
  }
}
