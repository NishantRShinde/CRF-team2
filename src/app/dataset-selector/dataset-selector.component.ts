import { Component, EventEmitter, Input, Output } from '@angular/core'; 
import { HttpClient } from '@angular/common/http'; 

enum Panel {
  SourceType,
  Dataset,
  Dataview
}
@Component({
  selector: 'app-dataset-selector',
  templateUrl: './dataset-selector.component.html',
  styleUrls: ['./dataset-selector.component.scss']
})
export class DatasetSelectorComponent {
  @Output() closedataset=new EventEmitter<boolean>();

  heading: string = 'Choose source type';
  isAtLeastOneCheckboxSelected = false;
  isDatasetOpen = false;

  dataset: any; 
  panel: any; 
  Panel=Panel;
  currentPanel = Panel.SourceType;

  constructor(  
    private http: HttpClient,
  ) { 
    this.http.get('../../assets/jsonfiles/dataset.json').subscribe((res) => {
      this.dataset = res;
      this.panel = this.dataset.panels_1;
    });
  }

  openData(){
    this.isDatasetOpen = !this.isDatasetOpen;
  }

  currentTitle: string = ''; 
  titleBeforeCurrent: string = ''; 
  searchText: string = '';

  onNext(): void {
    this.datasetSelected+=this.currentTitle+" | "
    this.currentPanel++; 
    if (this.currentPanel == Panel.Dataset) { 
      this.panel = this.dataset.panels_2; 
      this.heading = this.currentTitle; 
      this.titleBeforeCurrent=this.currentTitle
    } else if (this.currentPanel == Panel.Dataview) { 
      this.panel = this.dataset.panels_3; 
      this.heading = this.currentTitle; 
    } else { 
      this.panel = this.dataset.panels_1; 
      this.heading = 'Choose source type'; 
    } 
    this.isAtLeastOneCheckboxSelected = false; 
    this.searchText = '';
  }
  
  onBack(): void {
     this.datasetSelected = 'NielsenIQ ';
    this.currentPanel--; 
    if (this.currentPanel == Panel.SourceType) { 
      this.panel = this.dataset.panels_1; 
      this.heading = 'Choose source type'; 
    } else if (this.currentPanel == Panel.Dataset) { 
      this.panel = this.dataset.panels_2; 
      this.heading=this.titleBeforeCurrent
    } else { 
      this.panel = this.dataset.panels_3; 
    } 
    this.isAtLeastOneCheckboxSelected = false; 
    this.searchText = '';

  }
  
  filterData(): void {
    
    if (this.searchText) {
      if (this.currentPanel == Panel.Dataview) {
        this.panel = this.dataset.panels_3.filter((item: any) => {
          return item.title.toLowerCase().includes(this.searchText.toLowerCase());
        });
      } else {
        this.panel = this.dataset.panels_2.filter((item: any) => {
          return item.title.toLowerCase().includes(this.searchText.toLowerCase());
        });
      }
    } else {
      if (this.currentPanel == Panel.Dataview) {
        this.panel = this.dataset.panels_3;
      } else {
        this.panel = this.dataset.panels_2;
      }
    }
  }
  

  closeDatasetSelector() { 
    this.isDatasetOpen=false;
    this.closedataset.emit(false)

   
  }
  applydataset(){
    this.isDatasetOpen=false;
    this.closedataset.emit(false)

  }
  datasetSelected:string="NielsenIQ "

  checkboxSelector(title: string) {
    this.currentTitle = title; 
    this.isAtLeastOneCheckboxSelected = true; 
  }
}



