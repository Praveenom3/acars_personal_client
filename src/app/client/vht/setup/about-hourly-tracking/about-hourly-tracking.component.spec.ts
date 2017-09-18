import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutHourlyTrackingComponent } from './about-hourly-tracking.component';

describe('AboutHourlyTrackingComponent', () => {
  let component: AboutHourlyTrackingComponent;
  let fixture: ComponentFixture<AboutHourlyTrackingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutHourlyTrackingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutHourlyTrackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
