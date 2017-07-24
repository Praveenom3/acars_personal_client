import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MecCoverageComponent } from './mec-coverage.component';

describe('MecCoverageComponent', () => {
  let component: MecCoverageComponent;
  let fixture: ComponentFixture<MecCoverageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MecCoverageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MecCoverageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
