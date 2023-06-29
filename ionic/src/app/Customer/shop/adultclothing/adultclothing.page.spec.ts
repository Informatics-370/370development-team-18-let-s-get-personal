import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdultclothingPage } from './adultclothing.page';

describe('AdultclothingPage', () => {
  let component: AdultclothingPage;
  let fixture: ComponentFixture<AdultclothingPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AdultclothingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
