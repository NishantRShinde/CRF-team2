import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportPageFooterComponent } from './report-page-footer.component';

describe('ReportPageFooterComponent', () => {
  let component: ReportPageFooterComponent;
  let fixture: ComponentFixture<ReportPageFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportPageFooterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportPageFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
