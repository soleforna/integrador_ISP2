/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UsereditComponent } from './useredit.component';

describe('UsereditComponent', () => {
  let component: UsereditComponent;
  let fixture: ComponentFixture<UsereditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsereditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsereditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
