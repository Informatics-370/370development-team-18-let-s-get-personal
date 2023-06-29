import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditProductratingPage } from './edit-productrating.page';

describe('EditProductratingPage', () => {
  let component: EditProductratingPage;
  let fixture: ComponentFixture<EditProductratingPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EditProductratingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
