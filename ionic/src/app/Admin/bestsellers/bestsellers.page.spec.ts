import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BestsellersPage } from './bestsellers.page';

describe('BestsellersPage', () => {
  let component: BestsellersPage;
  let fixture: ComponentFixture<BestsellersPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(BestsellersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
