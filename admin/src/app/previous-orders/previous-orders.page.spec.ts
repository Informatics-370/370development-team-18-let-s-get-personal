import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PreviousOrdersPage } from './previous-orders.page';

describe('PreviousOrdersPage', () => {
  let component: PreviousOrdersPage;
  let fixture: ComponentFixture<PreviousOrdersPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PreviousOrdersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
