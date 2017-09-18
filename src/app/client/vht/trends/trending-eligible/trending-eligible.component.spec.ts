import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrendingEligibleComponent } from './trending-eligible.component';

describe('TrendingEligibleComponent', () => {
  let component: TrendingEligibleComponent;
  let fixture: ComponentFixture<TrendingEligibleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrendingEligibleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrendingEligibleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
