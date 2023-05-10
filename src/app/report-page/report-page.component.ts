import { Component, ViewChild } from '@angular/core';
import { ShimmerEffectService } from '../services/shimmer-effect/shimmer-effect.service';
import { HttpClient } from '@angular/common/http';
import { ColDef } from 'ag-grid-community';
import { OpenDatasetSelectorService } from '../services/open-dataset-selector/open-dataset-selector.service';
import { SidepanelService } from '../services/sidepanel/sidepanel.service';
import { LinechartDataServiceService } from '../services/linechart-data-service.service';
@Component({
  selector: 'app-report-page',
  templateUrl: './report-page.component.html',
  styleUrls: ['./report-page.component.scss'],
})
export class ReportPageComponent {
  @ViewChild('cardHolder') cardHolder: any;
  reportTitle: string = 'Untitled-Report';
  oldReportTitle: string = 'Untitled-Report';
  undo: string = '';
  redo: string = '';
  headerMore: boolean = false;
  undoIconDisable: boolean = true;
  redoIconDisable: boolean = true;
  downloadIconDisable: boolean = true;
  saveIconDisable: boolean = false;
  addcardIconDisable: boolean = false;
  moreIconDisable: boolean = false;
  expandCard: boolean = false;
  showChartList: boolean = false;
  chartOptions: { class: string; name: string }[] = [
    { class: 'bi bi-table', name: 'Table' },
    { class: 'bi bi-graph-up', name: 'Line chart' },
    { class: 'bi bi-bar-chart-line-fill', name: 'Column chart' },
    { class: 'bi bi-bar-chart-steps', name: 'Bar chart' },
    { class: 'bi bi-pie-chart-fill', name: 'Pie chart' },
    { class: 'bi bi-border-inner', name: 'Scatter chart' },
  ];
  preview: boolean = true;
  rowData: any;
  colData!: ColDef[];

  cardList!: {
    type: string;
    title: string;
    columns: any;
    showActualFact: boolean;
    viewStatus: string;
  }[];

  ngOnInit(): void {
    this.http
      .get('../../assets/jsonfiles/97210-RB_RULE.json')
      .subscribe((data) => {
        this.rowData = data;
      });
    // this.colData = this.getColumns();
    this.cardList = [
      {
        type: 'table',
        title: 'Table-1',
        columns: this.getColumns(false),
        showActualFact: false,
        viewStatus: 'preview',
      },
    ];
  }

  getColumns(showActualFact: boolean) {
    return [
      {
        field: 'market',
        headerName: 'Markets',
        headerClass: 'header-cell',
        cellClass: 'body-cell',
        width: 137,
      },
      {
        field: 'period',
        headerName: 'Periods',
        headerClass: 'header-cell',
        cellClass: 'body-cell',
        width: 134,
      },
      {
        field: 'product',
        headerName: 'Products',
        headerClass: 'header-cell',
        cellClass: 'body-cell',
        width: 205,
      },
      {
        field: '$',
        headerClass: 'header-cell',
        cellClass: 'body-cell',
        width: 180,

        valueFormatter: this.factFormatter.bind(this),
        valueFormatterParams: { showActualFact: showActualFact },
      },
    ];
  }

  constructor(
    public http: HttpClient,
    public openDatasetSelectorService: OpenDatasetSelectorService,
    public shimmerService: ShimmerEffectService,
    public sidepanelService: SidepanelService,
    public lineChartDataService:LinechartDataServiceService,
  ) {}

  headerMoreOptions = [
    { value: 'Save', class: 'fa fa-print' },
    { value: 'Add', class: 'fa fa-plus-circle' },
    { value: 'Report Filter', class: 'fa fa-filter' },
    { value: 'Edit Report layout', class: 'fa fa-retweet' },
  ];

  // rowData = [
  //   { make: 'Toyota', model: 'Celica', price: 35000 },
  //   { make: 'Ford', model: 'Mondeo', price: 32000 },
  //   { make: 'Porsche', model: 'Boxster', price: 72000 },
  // ];
  // colData = [
  //   { field: 'make' },
  //   { field: 'model' },
  //   { field: 'price', valueFormatter: this.valFormatter.bind(this), },
  // ];

  showBottomBar = false;
  addCard(type: string): void {
    let listLength = this.cardList.length + 1;
    this.showRunButton = true;
    this.shimmerService.shimmerEffect();
    this.showBottomBar = false;
    if (type === 'Table') {
      this.cardList.push({
        type: 'table',
        title: 'Table-' + listLength.toString(),
        columns: this.getColumns(false),
        showActualFact: false,
        viewStatus: 'preview',
      });
    } else if (type === 'Line chart') {
      this.cardList.push({
        type: 'lineChart',
        title: 'Chart-' + listLength.toString(),
        columns: this.getColumns(false),
        showActualFact: false,
        viewStatus: 'preview',
      });
    }
    this.showChartList = false;
    setTimeout(() => {
      this.cardHolder.nativeElement.scrollTop =
        this.cardHolder.nativeElement.scrollHeight;
    }, 0);
  }

  showRunButton: boolean = true;

  undoClick() {
    this.redo = this.reportTitle;
    this.reportTitle = this.undo;
    this.undoIconDisable = true;
    this.redoIconDisable = false;
  }

  redoClick() {
    this.reportTitle = this.redo;
    this.undoIconDisable = false;
    this.redoIconDisable = true;
  }

  saveReportTitle(): void {
    if (!this.reportTitle) {
      this.reportTitle = 'Untitled-Report';
      this.undoIconDisable = false;
      this.redoIconDisable = this.redo ? false : true;
      return;
    }
    this.undo = this.reportTitle;
    this.undoIconDisable = false;
    this.redoIconDisable = true;
  }

  saveInputText() {
    this.undo = this.oldReportTitle;
    this.undoIconDisable = false;
    this.oldReportTitle = this.reportTitle;
  }

  factFormatter(params: any) {
    const showActualFact = params.colDef.valueFormatterParams.showActualFact;
    if (showActualFact) {
      const numberValue = parseFloat(params.value);
      const formattedValue = numberValue.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      });
      return formattedValue;
    }
    return '###';
  }

  RunButton() {
    for (let i of this.cardList) {
      if (!i.showActualFact && i.type==='table') {
        i.showActualFact = true;
        i.columns = this.getColumns(true);
        i.viewStatus = 'running';
      }
      else if (!i.showActualFact && i.type==='lineChart' ){
        i.showActualFact = true; 
        i.viewStatus = 'running';
        this.lineChartDataService.renderLineChart()
        
      } 
      else {
        i.viewStatus = 'actual';
      }
      this.shimmerService.shimmerEffect();   
     }
    
    this.showRunButton = false;
    this.showBottomBar = true;

  }
  cancelButton() {
    this.showBottomBar = false;
    this.showRunButton = true;
    for (let i of this.cardList) {
      if (i.viewStatus === 'running') {
        i.viewStatus = 'preview';
        i.showActualFact = false;
        i.columns = this.getColumns(false);
      }
    }
  }
}
