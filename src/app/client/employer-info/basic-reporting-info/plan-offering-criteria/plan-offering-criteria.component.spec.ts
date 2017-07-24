import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanOfferingCriteriaComponent } from './plan-offering-criteria.component';

describe('PlanOfferingCriteriaComponent', () => {
  let component: PlanOfferingCriteriaComponent;
  let fixture: ComponentFixture<PlanOfferingCriteriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanOfferingCriteriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanOfferingCriteriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
