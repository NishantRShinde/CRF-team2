import { Component } from '@angular/core'; 
import { HttpClient } from '@angular/common/http'; 
import { ShimmerEffectService } from '../services/shimmer-effect/shimmer-effect.service'; 
// import content from "./src/assets/Json/content.json";
import { SidepanelComponent } from '../sidepanel/sidepanel.component';
import { SidepanelService } from '../services/sidepanel/sidepanel.service';

@Component({
  selector: 'app-data-summary',
  templateUrl: './data-summary.component.html',
  styleUrls: ['./data-summary.component.scss'],
})
export class DataSummaryComponent { 
  content: any; 
  jsonData: any;
  showSelected!: string;
  trueSelectCount!: number
  constructor( 
    private http: HttpClient, 
    public shimmerService: ShimmerEffectService,
    public sidepanelService: SidepanelService
  ) { 
    this.http.get('../../assets/Json/content.json').subscribe((res)=>{
      this.content = res; 
    }); 

    this.jsonData = this.sidepanelService.selectedList

    this.trueSelectCount = 0;

    // loop through the items and selects
    for (let item of this.sidepanelService.getMainKeys()) {
      this.trueSelectCount = 0
      for (let select of this.sidepanelService.getKeys(item)) {
        
        if (this.sidepanelService.selectedList[item][1][select] === true) {
          this.trueSelectCount++;
        }
      }
    }

  } 
  count = 0;
  numberOfTrueValues(selector: string) {
    this.count = 0;
    let onlyOneSelector = ''
    for(let key of Object.keys(this.sidepanelService.selectedList[selector][1])) {
      if(this.sidepanelService.selectedList[selector][1][key]) {
        this.count++;
        onlyOneSelector = key
      }
    }

    if(this.count == 0) {
      this.showSelected = "Select " + selector
    }else if(this.count == 1) {
      this.showSelected = onlyOneSelector
    }
    else{
      this.showSelected = this.count +" "+ selector
    }
  }
  
  keys(): Array<string> { 
    return Object.keys(this.content); 
  } 
  

  openSidepanel(item:string){
    this.sidepanelService.isSidepanelOpen = true
    this.sidepanelService.currentSelected = item
    this.sidepanelService.addActive = false
    this.sidepanelService.add = ""

  }

  
}
