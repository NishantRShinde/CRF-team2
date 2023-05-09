import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DataSummaryComponent } from './data-summary/data-summary.component';
import { DatasetSelectorComponent } from './dataset-selector/dataset-selector.component';
import { MatIconModule } from '@angular/material/icon';
import { BrandbarComponent } from './brandbar/brandbar.component';
import { ReportPageComponent } from './report-page/report-page.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { ReportPageFooterComponent } from './report-page/report-page-footer/report-page-footer.component';
import { AgGridModule } from 'ag-grid-angular';
import { SidepanelComponent } from './sidepanel/sidepanel.component';
import { BottomBarComponent } from './bottom-bar/bottom-bar.component';
import { LineChartComponent } from './line-chart/line-chart.component';
import { ChartModule } from 'angular-highcharts';

@NgModule({
  declarations: [
    AppComponent,
    DataSummaryComponent,
    DatasetSelectorComponent,
    BrandbarComponent,
    ReportPageFooterComponent,
    ReportPageComponent,
    SidepanelComponent,
    BottomBarComponent,
    LineChartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatIconModule,
    FormsModule,
    ChartModule,
    HttpClientModule,
    NgxSkeletonLoaderModule,
    AgGridModule,
    RouterModule.forRoot([
      { path: 'home', component: AppComponent },
      { path: 'monitorMyBusiness', component: AppComponent },
      { path: 'chooseATemplate', component: AppComponent },
      { path: 'buildATable', component: AppComponent },
      { path: 'findMyStuff', component: AppComponent },
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
