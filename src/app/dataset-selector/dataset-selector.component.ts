import { Component, EventEmitter, Input, Output } from '@angular/core'; 
import { HttpClient } from '@angular/common/http'; 
import { ShimmerEffectService } from '../services/shimmer-effect/shimmer-effect.service'; 
import { OpenDatasetSelectorService } from '../services/open-dataset-selector/open-dataset-selector.service';

enum Panel {
  SourceType,
  Dataset,
  Dataview
}
@Component({
  selector: 'app-dataset-selector',
  templateUrl: './dataset-selector.component.html',
  styleUrls: ['./dataset-selector.component.scss'],
})

export class DatasetSelectorComponent { 
  // @Output() sendDataSources = new EventEmitter<string>();
  // @Output() sendFooterContent = new EventEmitter<string>(); 

  heading: string = 'Choose source type';
  isAtLeastOneCheckboxSelected = false;

  dataset: any; 
  panel: any; 
  Panel=Panel;
  currentPanel = Panel.SourceType;

  constructor( 
    public shimmerService: ShimmerEffectService, 
    private http: HttpClient,
     public openDatasetSelectorService:OpenDatasetSelectorService,
  ) { 
    this.http.get('../../assets/jsonfiles/dataset.json').subscribe((res) => {
      this.dataset = res;
      this.panel = this.dataset.panels_1;
    });
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
    this.openDatasetSelectorService.isSelectorOpen=false;

    //closing container 
    // const temp: boolean = false;
    // this.ChangeBoolean.emit(temp);
  }

  // footercontent(datasetlists:string[]){
  //   let content: string = "NielsenIQ "
  //   content += datasetlists[0];
  //   for(let i=1; i<3; i++){
  //     content += " | " + datasetlists[i];
  //   }
  //   // console.log(content);
  //    return content;
  // } 
  datasetSelected:string="NielsenIQ "


  applydataset() {
    this.openDatasetSelectorService.isFirst = false;
    this.datasetSelected+=this.currentTitle;
    this.openDatasetSelectorService.isSelectorOpen=false;
    this.shimmerService.shimmerEffect(); 
    this.openDatasetSelectorService.appliedDataset=this.datasetSelected;
    this.openDatasetSelectorService.isDataApplied=true;
  } 
  checkboxSelector(title: string) {
    this.currentTitle = title; 
    this.isAtLeastOneCheckboxSelected = true; 
  }
}