import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditStockTypesPage } from './edit-stock-types.page';

describe('EditStockTypesPage', () => {
  let component: EditStockTypesPage;
  let fixture: ComponentFixture<EditStockTypesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EditStockTypesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
