import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AggregatedGroupComponent } from './aggregated-group.component';

describe('AggregatedGroupComponent', () => {
  let component: AggregatedGroupComponent;
  let fixture: ComponentFixture<AggregatedGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AggregatedGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AggregatedGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
