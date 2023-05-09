import { Component } from '@angular/core';
import { OpenDatasetSelectorService } from '../../services/open-dataset-selector/open-dataset-selector.service';

@Component({
  selector: 'app-report-page-footer',
  templateUrl: './report-page-footer.component.html',
  styleUrls: ['./report-page-footer.component.scss']
})
export class ReportPageFooterComponent {
  constructor(public openDatasetSelectorService: OpenDatasetSelectorService,) { }
  OpenDatasetSelector() {
    this.openDatasetSelectorService.isSelectorOpen = true;
  }
}
