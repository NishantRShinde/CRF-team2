import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { DataSummaryComponent } from '../data-summary/data-summary.component';
import { SidepanelService } from '../services/sidepanel/sidepanel.service';
@Component({
  selector: 'app-sidepanel',
  templateUrl: './sidepanel.component.html',
  styleUrls: ['./sidepanel.component.scss']
})
export class SidepanelComponent {

  content: any
  constructor(public sidepanelService : SidepanelService,
    public http: HttpClient
    ){
    var z = document.getElementById("reportpage");
    if(this.sidepanelService.isSidepanelOpen && z!= null){
          z.style.marginRight = "320px";
    }

    this.http.get('../../assets/Json/content.json').subscribe((res)=>{
      this.content = res; 
    });
  }

  add(item:string){
    this.sidepanelService.add = item
    this.sidepanelService.currentSelected = ""
    this.sidepanelService.addActive = true
  }

  addBack(item:string){
    this.sidepanelService.addActive = false
    this.sidepanelService.currentSelected = item
    this.sidepanelService.add = ""
  }

  addDone(item: string){
    this.sidepanelService.addActive = false
    this.sidepanelService.currentSelected = item
    this.sidepanelService.add = ""
  }

  trash(item:string,select:string){
    this.sidepanelService.selectedList[item][1][select] = false
  }
  
  plus(item:string,select:string){
    this.sidepanelService.selectedList[item][1][select] = true
  }

}
