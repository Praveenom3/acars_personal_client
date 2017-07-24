import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoverageOfferedComponent } from './coverage-offered.component';

describe('CoverageOfferedComponent', () => {
  let component: CoverageOfferedComponent;
  let fixture: ComponentFixture<CoverageOfferedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoverageOfferedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoverageOfferedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
