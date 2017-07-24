import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanClassesComponent } from './plan-classes.component';

describe('PlanClassesComponent', () => {
  let component: PlanClassesComponent;
  let fixture: ComponentFixture<PlanClassesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanClassesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanClassesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
