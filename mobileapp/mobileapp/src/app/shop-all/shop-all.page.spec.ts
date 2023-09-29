import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShopAllPage } from './shop-all.page';

describe('ShopAllPage', () => {
  let component: ShopAllPage;
  let fixture: ComponentFixture<ShopAllPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ShopAllPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
