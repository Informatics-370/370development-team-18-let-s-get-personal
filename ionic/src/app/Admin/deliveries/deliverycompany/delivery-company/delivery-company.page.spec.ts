import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeliveryCompanyPage } from './delivery-company.page';

describe('DeliveryCompanyPage', () => {
  let component: DeliveryCompanyPage;
  let fixture: ComponentFixture<DeliveryCompanyPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DeliveryCompanyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
