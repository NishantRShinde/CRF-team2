import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShimmerEffectService {  
  public shimmerTimeout: any;
  isloading: boolean = false;

  constructor() {}

  shimmerEffect() {
    this.isloading = true;
    this.shimmerTimeout = setTimeout(() => {
      this.isloading = false;
    }, 2500);
  }

  cancelShimmerEffect() {
    clearTimeout(this.shimmerTimeout);
    this.isloading = false;
  }
}