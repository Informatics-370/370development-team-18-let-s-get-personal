import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StockitemcoloursPage } from './stockitemcolours.page';

describe('StockitemcoloursPage', () => {
  let component: StockitemcoloursPage;
  let fixture: ComponentFixture<StockitemcoloursPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(StockitemcoloursPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
