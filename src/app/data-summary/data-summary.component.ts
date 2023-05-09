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
  constructor( 
    private http: HttpClient, 
    public shimmerService: ShimmerEffectService,
    public sidepanelService: SidepanelService
  ) { 
    this.http.get('../../assets/Json/content.json').subscribe((res)=>{
      this.content = res; 
    }); 
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
