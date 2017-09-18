import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VhtActionsComponent } from './vht-actions.component';

describe('VhtActionsComponent', () => {
  let component: VhtActionsComponent;
  let fixture: ComponentFixture<VhtActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VhtActionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VhtActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
