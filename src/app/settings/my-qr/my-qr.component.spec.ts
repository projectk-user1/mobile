import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyQRComponent } from './my-qr.component';

describe('MyQRComponent', () => {
  let component: MyQRComponent;
  let fixture: ComponentFixture<MyQRComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyQRComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyQRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
