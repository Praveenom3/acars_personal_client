import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoverageTypeComponent } from './coverage-type.component';

describe('CoverageTypeComponent', () => {
  let component: CoverageTypeComponent;
  let fixture: ComponentFixture<CoverageTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoverageTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoverageTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
