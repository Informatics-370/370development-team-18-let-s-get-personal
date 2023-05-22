import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditstocktypePage } from './editstocktype.page';

describe('EditstocktypePage', () => {
  let component: EditstocktypePage;
  let fixture: ComponentFixture<EditstocktypePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EditstocktypePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
