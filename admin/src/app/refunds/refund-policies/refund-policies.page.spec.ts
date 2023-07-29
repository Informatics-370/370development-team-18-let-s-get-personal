import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RefundPoliciesPage } from './refund-policies.page';

describe('RefundPoliciesPage', () => {
  let component: RefundPoliciesPage;
  let fixture: ComponentFixture<RefundPoliciesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RefundPoliciesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
