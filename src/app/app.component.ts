import { Component } from '@angular/core';
import { OpenDatasetSelectorService } from './services/open-dataset-selector/open-dataset-selector.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(public openDatasetSelectorService: OpenDatasetSelectorService) {}
}