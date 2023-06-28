import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditDiscountsPage } from './edit-discounts.page';

describe('EditDiscountsPage', () => {
  let component: EditDiscountsPage;
  let fixture: ComponentFixture<EditDiscountsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EditDiscountsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
