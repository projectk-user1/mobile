import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GunaCountComponent } from './guna-count.component';

describe('GunaCountComponent', () => {
  let component: GunaCountComponent;
  let fixture: ComponentFixture<GunaCountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GunaCountComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GunaCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
