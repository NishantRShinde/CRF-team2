import { Component } from '@angular/core';
import { ShimmerEffectService } from '../services/shimmer-effect/shimmer-effect.service';
import { HttpClient } from '@angular/common/http';
import { ColDef } from 'ag-grid-community';
import { OpenDatasetSelectorService } from '../services/open-dataset-selector/open-dataset-selector.service';
import { SidepanelService } from '../services/sidepanel/sidepanel.service';

@Component({
  selector: 'app-report-page',
  templateUrl: './report-page.component.html',
  styleUrls: ['./report-page.component.scss'],
})
export class ReportPageComponent {
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
  preview: boolean = true;
  rowData: any;
  // colData!: ColDef[];

  ngOnInit(): void {
    this.http
      .get('../../assets/jsonfiles/97210-RB_RULE.json')
      .subscribe((data) => {
        this.rowData = data;
      });
    // this.cardList[0].columns = this.getColumns();
  }

  colData = [
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
    },
  ];

  showChartList: boolean = false;
  chartOptions: { class: string; name: string }[] = [
    { class: 'bi bi-table', name: 'Table' },
    { class: 'bi bi-graph-up', name: 'Line chart' },
    { class: 'bi bi-bar-chart-line-fill', name: 'Column chart' },
    { class: 'bi bi-bar-chart-steps', name: 'Bar chart' },
    { class: 'bi bi-pie-chart-fill', name: 'Pie chart' },
    { class: 'bi bi-border-inner', name: 'Scatter chart' },
  ];

  constructor(
    public http: HttpClient,
    public openDatasetSelectorService: OpenDatasetSelectorService,
    public shimmerService: ShimmerEffectService,
    public sidepanelService: SidepanelService) { }

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
  addCard(type: string): void {}
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

  valFormatter(params: any) {
    if (this.preview) {
      return '###'
    }
    return params.value
  }

  RunButton() {
    this.showRunButton = false;
    this.showBottomBar = true;
    this.shimmerService.shimmerEffect(); 
  }

}
