import { Component, Output, EventEmitter } from '@angular/core';

import { ShimmerEffectService } from '../services/shimmer-effect/shimmer-effect.service';

@Component({
  selector: 'app-bottom-bar',
  templateUrl: './bottom-bar.component.html',
  styleUrls: ['./bottom-bar.component.scss']
})
export class BottomBarComponent {
  @Output() cancel = new EventEmitter<void>();

constructor(
  public shimmerService: ShimmerEffectService) { }

  cancelButton() {
    this.cancel.emit();
  }

}
