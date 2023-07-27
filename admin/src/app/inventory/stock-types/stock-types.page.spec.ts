import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StockTypesPage } from './stock-types.page';

describe('StockTypesPage', () => {
  let component: StockTypesPage;
  let fixture: ComponentFixture<StockTypesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(StockTypesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
