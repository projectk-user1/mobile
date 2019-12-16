import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DateDiffCalcComponent } from './date-diff-calc.component';

describe('DateDiffCalcComponent', () => {
  let component: DateDiffCalcComponent;
  let fixture: ComponentFixture<DateDiffCalcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DateDiffCalcComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DateDiffCalcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
