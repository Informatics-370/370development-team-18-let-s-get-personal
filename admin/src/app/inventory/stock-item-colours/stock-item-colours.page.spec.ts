import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StockItemColoursPage } from './stock-item-colours.page';

describe('StockItemColoursPage', () => {
  let component: StockItemColoursPage;
  let fixture: ComponentFixture<StockItemColoursPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(StockItemColoursPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
