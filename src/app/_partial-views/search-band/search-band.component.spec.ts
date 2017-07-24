import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBandComponent } from './search-band.component';

describe('SearchBandComponent', () => {
  let component: SearchBandComponent;
  let fixture: ComponentFixture<SearchBandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchBandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchBandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
