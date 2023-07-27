import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StationaryPage } from './stationary.page';

describe('StationaryPage', () => {
  let component: StationaryPage;
  let fixture: ComponentFixture<StationaryPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(StationaryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
