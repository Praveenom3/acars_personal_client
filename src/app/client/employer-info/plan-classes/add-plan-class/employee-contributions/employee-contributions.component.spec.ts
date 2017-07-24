import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeContributionsComponent } from './employee-contributions.component';

describe('EmployeeContributionsComponent', () => {
  let component: EmployeeContributionsComponent;
  let fixture: ComponentFixture<EmployeeContributionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeContributionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeContributionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
