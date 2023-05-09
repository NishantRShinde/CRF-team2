import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidepanelService {

  isSidepanelOpen:boolean = false
  currentSelected:string = ''
  addActive: boolean = false
  add:string = ''
  constructor() { }
}
