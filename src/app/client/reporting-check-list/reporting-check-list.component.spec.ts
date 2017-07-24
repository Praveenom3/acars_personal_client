import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportingCheckListComponent } from './reporting-check-list.component';

describe('ReportingCheckListComponent', () => {
  let component: ReportingCheckListComponent;
  let fixture: ComponentFixture<ReportingCheckListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportingCheckListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportingCheckListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
