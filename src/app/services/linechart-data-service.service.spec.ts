import { TestBed } from '@angular/core/testing';

import { LinechartDataServiceService } from './linechart-data-service.service';

describe('LinechartDataServiceService', () => {
  let service: LinechartDataServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LinechartDataServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
