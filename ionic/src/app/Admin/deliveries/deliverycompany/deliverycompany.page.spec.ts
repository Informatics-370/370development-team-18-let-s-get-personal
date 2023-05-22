import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeliverycompanyPage } from './deliverycompany.page';

describe('DeliverycompanyPage', () => {
  let component: DeliverycompanyPage;
  let fixture: ComponentFixture<DeliverycompanyPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DeliverycompanyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
