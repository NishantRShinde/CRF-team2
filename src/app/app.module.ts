import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DataSummaryComponent } from './data-summary/data-summary.component';
import { DatasetSelectorComponent } from './dataset-selector/dataset-selector.component';
import { BrandbarComponent } from './brandbar/brandbar.component';
import { ReportPageComponent } from './report-page/report-page.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    DataSummaryComponent,
    DatasetSelectorComponent,
    BrandbarComponent,
    ReportPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
