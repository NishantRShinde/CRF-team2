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
  // selectedList!: any
  constructor(public sidepanelService : SidepanelService,
    public http: HttpClient
    ){
    var z = document.getElementById("reportpage");
    if(this.sidepanelService.isSidepanelOpen && z!= null){
          z.style.marginRight = "320px";
    }

    this.http.get('../../assets/Json/content.json').subscribe((res)=>{
      this.content = res; 
      // console.log('--- result : ', this.content);  
    });
    // this.http.get('../../assets/Json/sample.json').subscribe((res)=>{
    //   this.selectedList = res; 
    //   // console.log('--- result : ', this.selectedList); 
    // });
  }

  // getKeys(selector: string): Array<string>{
  //   return Object.keys(this.selectedList[selector][1]); 
  // }

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

  close(){
    this.sidepanelService.isSidepanelOpen = false
    this.sidepanelService.addActive = false
    this.sidepanelService.add = ""
    var y =document.getElementById("sidepanel")
    var z = document.getElementById("reportpage");
    if(!this.sidepanelService.isSidepanelOpen && y != null && z != null){
      z.style.marginRight = "0px";
      y.style.width = "0px"
    }
  }

  trash(item:string,select:string){
    this.sidepanelService.selectedList[item][1][select] = false
  }
  
  plus(item:string,select:string){
    this.sidepanelService.selectedList[item][1][select] = true
  }

}
