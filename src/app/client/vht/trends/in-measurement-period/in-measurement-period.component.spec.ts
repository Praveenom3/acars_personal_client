import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InMeasurementPeriodComponent } from './in-measurement-period.component';

describe('InMeasurementPeriodComponent', () => {
  let component: InMeasurementPeriodComponent;
  let fixture: ComponentFixture<InMeasurementPeriodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InMeasurementPeriodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InMeasurementPeriodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
