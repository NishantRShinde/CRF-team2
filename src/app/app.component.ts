import { Component } from '@angular/core';
import { OpenDatasetSelectorService } from './services/open-dataset-selector/open-dataset-selector.service';
import { SidepanelService } from './services/sidepanel/sidepanel.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(public openDatasetSelectorService: OpenDatasetSelectorService,
    public sidepanelService: SidepanelService) {}
}
