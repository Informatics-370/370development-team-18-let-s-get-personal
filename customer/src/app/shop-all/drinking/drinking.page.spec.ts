import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DrinkingPage } from './drinking.page';

describe('DrinkingPage', () => {
  let component: DrinkingPage;
  let fixture: ComponentFixture<DrinkingPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DrinkingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
