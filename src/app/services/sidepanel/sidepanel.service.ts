import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
@Injectable({
  providedIn: 'root'
})
export class SidepanelService {
  selectedList!: any
  isSidepanelOpen:boolean = false
  currentSelected:string = ''
  addActive: boolean = false
  add:string = ''
  constructor(public http: HttpClient) {
    this.http.get('../../assets/Json/sample.json').subscribe((res)=>{
      this.selectedList = res; 
    });
   }
   getKeys(selector: string): Array<string>{
    return Object.keys(this.selectedList[selector][1]); 
  }

  getMainKeys(){
    return Object.keys(this.selectedList);
  }
}
