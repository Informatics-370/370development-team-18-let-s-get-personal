import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SuccessfulPaymentPage } from './successful-payment.page';

describe('SuccessfulPaymentPage', () => {
  let component: SuccessfulPaymentPage;
  let fixture: ComponentFixture<SuccessfulPaymentPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SuccessfulPaymentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
