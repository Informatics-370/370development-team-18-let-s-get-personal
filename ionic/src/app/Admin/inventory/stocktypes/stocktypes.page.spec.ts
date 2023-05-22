import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { StocktypesPage } from './stocktypes.page';

describe('StocktypesPage', () => {
  let component: StocktypesPage;
  let fixture: ComponentFixture<StocktypesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(StocktypesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
