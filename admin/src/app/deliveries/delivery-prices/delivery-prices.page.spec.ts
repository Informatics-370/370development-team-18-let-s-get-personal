import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeliveryPricesPage } from './delivery-prices.page';

describe('DeliveryPricesPage', () => {
  let component: DeliveryPricesPage;
  let fixture: ComponentFixture<DeliveryPricesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DeliveryPricesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
