import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralPlanInformationComponent } from './general-plan-information.component';

describe('GeneralPlanInformationComponent', () => {
  let component: GeneralPlanInformationComponent;
  let fixture: ComponentFixture<GeneralPlanInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneralPlanInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralPlanInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
