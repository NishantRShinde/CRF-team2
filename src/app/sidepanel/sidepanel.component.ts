import { Component } from '@angular/core';
import { DataSummaryComponent } from '../data-summary/data-summary.component';
import { SidepanelService } from '../services/sidepanel/sidepanel.service';
@Component({
  selector: 'app-sidepanel',
  templateUrl: './sidepanel.component.html',
  styleUrls: ['./sidepanel.component.scss']
})
export class SidepanelComponent {

  constructor(public sidepanelService : SidepanelService){
    var z = document.getElementById("reportpage");
    if(this.sidepanelService.isSidepanelOpen && z!= null){
          z.style.marginRight = "320px";
    }
  }

  close(){
    this.sidepanelService.isSidepanelOpen = false
    var y =document.getElementById("sidepanel")
    var z = document.getElementById("reportpage");
    if(!this.sidepanelService.isSidepanelOpen && y != null && z != null){
      z.style.marginRight = "0px";
      y.style.width = "0px"
    }
  }

}
