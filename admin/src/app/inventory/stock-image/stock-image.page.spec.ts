import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StockImagePage } from './stock-image.page';

describe('StockImagePage', () => {
  let component: StockImagePage;
  let fixture: ComponentFixture<StockImagePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(StockImagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
