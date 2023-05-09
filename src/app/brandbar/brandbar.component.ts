import { Component } from '@angular/core';
import { OpenDatasetSelectorService } from '../services/open-dataset-selector/open-dataset-selector.service';
@Component({
  selector: 'app-brandbar',
  templateUrl: './brandbar.component.html',
  styleUrls: ['./brandbar.component.scss'],
})
export class BrandbarComponent {
  constructor(public openDatasetSelectorService: OpenDatasetSelectorService) {}

  currentlySelected: string = AllPermissions.buildATable;

  //user object
  user: {
    uname: string;
    permissions: Array<{ name: string; route: string }>;
  } = {
    uname: 'Nishant.Shinde',
    permissions: [
      { name: AllPermissions.monitorMyBusiness, route: '/monitorMyBusiness' },
      { name: AllPermissions.chooseATemplate, route: 'chooseATemplate' },
      { name: AllPermissions.buildATable, route: '/buildATable' },
      { name: AllPermissions.findMyStuff, route: '/findMyStuff' },
    ],
  };

  changeCurrentlySelected(permission: string): void {
    this.currentlySelected = permission;
    if (this.currentlySelected === AllPermissions.buildATable) {
      this.openDatasetSelectorService.isOnBuildATable = true;
    } else {
      this.openDatasetSelectorService.isOnBuildATable = false;
    }
  }
}

enum AllPermissions {
  monitorMyBusiness = 'Monitor my business',
  chooseATemplate = 'Choose a template',
  buildATable = 'Build a table',
  findMyStuff = 'Find my stuff',
}
