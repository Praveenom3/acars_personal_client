import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeesdetailsComponent } from './employeesdetails.component';

describe('EmployeesdetailsComponent', () => {
  let component: EmployeesdetailsComponent;
  let fixture: ComponentFixture<EmployeesdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeesdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeesdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
