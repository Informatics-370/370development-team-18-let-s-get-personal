import { ComponentFixture, TestBed } from '@angular/core/testing';
<<<<<<<< HEAD:customer/src/app/shop-all/stationary/stationary.page.spec.ts
import { StationaryPage } from './stationary.page';

describe('StationaryPage', () => {
  let component: StationaryPage;
  let fixture: ComponentFixture<StationaryPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(StationaryPage);
========
import { PriceHistoryPage } from './price-history.page';

describe('PriceHistoryPage', () => {
  let component: PriceHistoryPage;
  let fixture: ComponentFixture<PriceHistoryPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PriceHistoryPage);
>>>>>>>> developer:admin/src/app/inventory/price-history/price-history.page.spec.ts
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
