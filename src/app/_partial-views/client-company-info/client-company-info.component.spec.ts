import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientCompanyInfoComponent } from './client-company-info.component';

describe('ClientCompanyInfoComponent', () => {
  let component: ClientCompanyInfoComponent;
  let fixture: ComponentFixture<ClientCompanyInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientCompanyInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientCompanyInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
