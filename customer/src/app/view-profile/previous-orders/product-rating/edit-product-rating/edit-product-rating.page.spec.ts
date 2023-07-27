import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditProductRatingPage } from './edit-product-rating.page';

describe('EditProductRatingPage', () => {
  let component: EditProductRatingPage;
  let fixture: ComponentFixture<EditProductRatingPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EditProductRatingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
