import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductTrendsPage } from './product-trends.page';

describe('ProductTrendsPage', () => {
  let component: ProductTrendsPage;
  let fixture: ComponentFixture<ProductTrendsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ProductTrendsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
