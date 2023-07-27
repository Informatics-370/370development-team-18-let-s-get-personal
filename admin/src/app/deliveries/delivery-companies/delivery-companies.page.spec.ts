import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeliveryCompaniesPage } from './delivery-companies.page';

describe('DeliveryCompaniesPage', () => {
  let component: DeliveryCompaniesPage;
  let fixture: ComponentFixture<DeliveryCompaniesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DeliveryCompaniesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
