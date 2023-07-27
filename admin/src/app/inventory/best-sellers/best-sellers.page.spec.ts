import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BestSellersPage } from './best-sellers.page';

describe('BestSellersPage', () => {
  let component: BestSellersPage;
  let fixture: ComponentFixture<BestSellersPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(BestSellersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
