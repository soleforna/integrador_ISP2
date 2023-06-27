import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingDetailsComponent } from './shopping-details.component';

describe('ShoppingDetailsComponent', () => {
  let component: ShoppingDetailsComponent;
  let fixture: ComponentFixture<ShoppingDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShoppingDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShoppingDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
