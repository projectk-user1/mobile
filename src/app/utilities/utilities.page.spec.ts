import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UtilitiesPage } from './utilities.page';

describe('UtilitiesPage', () => {
  let component: UtilitiesPage;
  let fixture: ComponentFixture<UtilitiesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UtilitiesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UtilitiesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
