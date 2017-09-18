import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VhtBandComponent } from './vht-band.component';

describe('VhtBandComponent', () => {
  let component: VhtBandComponent;
  let fixture: ComponentFixture<VhtBandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VhtBandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VhtBandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
