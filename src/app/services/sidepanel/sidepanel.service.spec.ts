import { TestBed } from '@angular/core/testing';

import { SidepanelService } from './sidepanel.service';

describe('SidepanelService', () => {
  let service: SidepanelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SidepanelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
