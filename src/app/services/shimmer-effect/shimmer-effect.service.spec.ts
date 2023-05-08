import { TestBed } from '@angular/core/testing';

import { ShimmerEffectService } from './shimmer-effect.service';

describe('ShimmerEffectService', () => {
  let service: ShimmerEffectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShimmerEffectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
