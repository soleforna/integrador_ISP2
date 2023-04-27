import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutCardComponent } from './checkout-card.component';

describe('CheckoutCardComponent', () => {
  let component: CheckoutCardComponent;
  let fixture: ComponentFixture<CheckoutCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckoutCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckoutCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
