import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrderRequestsPage } from './order-requests.page';

describe('OrderRequestsPage', () => {
  let component: OrderRequestsPage;
  let fixture: ComponentFixture<OrderRequestsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(OrderRequestsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
