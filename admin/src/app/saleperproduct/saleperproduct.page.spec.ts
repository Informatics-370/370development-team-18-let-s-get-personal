import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SaleperproductPage } from './saleperproduct.page';

describe('SaleperproductPage', () => {
  let component: SaleperproductPage;
  let fixture: ComponentFixture<SaleperproductPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SaleperproductPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
