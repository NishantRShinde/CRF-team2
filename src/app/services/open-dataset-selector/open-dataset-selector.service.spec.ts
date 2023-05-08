import { TestBed } from '@angular/core/testing';

import { OpenDatasetSelectorService } from './open-dataset-selector.service';

describe('OpenDatasetSelectorService', () => {
  let service: OpenDatasetSelectorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpenDatasetSelectorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
