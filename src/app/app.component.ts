import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isDatasetOpen:boolean=false;

  openData():void{
    this.isDatasetOpen=true;
  }
}

