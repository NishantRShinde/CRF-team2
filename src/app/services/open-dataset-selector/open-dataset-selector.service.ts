import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OpenDatasetSelectorService {

  constructor() { }
  isDataApplied: boolean = false;
  isSelectorOpen: boolean = true;
  appliedDataset: string = '';
}
