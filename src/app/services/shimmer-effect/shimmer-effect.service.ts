import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShimmerEffectService {  
    isloading: boolean = false;


  constructor() {
    setTimeout(() => {
      this.isloading = false;
    }, 2500);
  }

  shimmerEffect() {
    this.isloading = true;
    setTimeout(() => {
      this.isloading = false;
    }, 2500);
  }
}
