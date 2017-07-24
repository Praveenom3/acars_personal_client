import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientReportingBandComponent } from './client-reporting-band.component';

describe('ClientReportingBandComponent', () => {
  let component: ClientReportingBandComponent;
  let fixture: ComponentFixture<ClientReportingBandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientReportingBandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientReportingBandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
