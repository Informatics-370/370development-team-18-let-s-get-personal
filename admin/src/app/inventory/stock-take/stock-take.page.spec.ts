import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StockTakePage } from './stock-take.page';

describe('StockTakePage', () => {
  let component: StockTakePage;
  let fixture: ComponentFixture<StockTakePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(StockTakePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
