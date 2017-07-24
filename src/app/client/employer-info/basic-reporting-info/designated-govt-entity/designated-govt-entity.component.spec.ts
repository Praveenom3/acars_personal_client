import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignatedGovtEntityComponent } from './designated-govt-entity.component';

describe('DesignatedGovtEntityComponent', () => {
  let component: DesignatedGovtEntityComponent;
  let fixture: ComponentFixture<DesignatedGovtEntityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesignatedGovtEntityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesignatedGovtEntityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
