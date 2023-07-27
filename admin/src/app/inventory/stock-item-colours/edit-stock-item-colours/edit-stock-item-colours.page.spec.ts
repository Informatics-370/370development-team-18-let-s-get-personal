import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditStockItemColoursPage } from './edit-stock-item-colours.page';

describe('EditStockItemColoursPage', () => {
  let component: EditStockItemColoursPage;
  let fixture: ComponentFixture<EditStockItemColoursPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EditStockItemColoursPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
