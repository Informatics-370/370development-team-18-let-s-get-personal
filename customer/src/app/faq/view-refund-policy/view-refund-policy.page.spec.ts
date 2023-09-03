import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewRefundPolicyPage } from './view-refund-policy.page';

describe('ViewRefundPolicyPage', () => {
  let component: ViewRefundPolicyPage;
  let fixture: ComponentFixture<ViewRefundPolicyPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ViewRefundPolicyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
