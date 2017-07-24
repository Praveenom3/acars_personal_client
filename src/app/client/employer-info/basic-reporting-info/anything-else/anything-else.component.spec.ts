import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnythingElseComponent } from './anything-else.component';

describe('AnythingElseComponent', () => {
  let component: AnythingElseComponent;
  let fixture: ComponentFixture<AnythingElseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnythingElseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnythingElseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
