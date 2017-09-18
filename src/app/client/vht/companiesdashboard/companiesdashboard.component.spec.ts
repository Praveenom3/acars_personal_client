import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompaniesdashboardComponent } from './companiesdashboard.component';

describe('CompaniesdashboardComponent', () => {
  let component: CompaniesdashboardComponent;
  let fixture: ComponentFixture<CompaniesdashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompaniesdashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompaniesdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
