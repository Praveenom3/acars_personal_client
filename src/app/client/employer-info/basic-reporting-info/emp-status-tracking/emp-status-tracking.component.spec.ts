import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpStatusTrackingComponent } from './emp-status-tracking.component';

describe('EmpStatusTrackingComponent', () => {
  let component: EmpStatusTrackingComponent;
  let fixture: ComponentFixture<EmpStatusTrackingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpStatusTrackingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpStatusTrackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
