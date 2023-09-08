import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RatingGraphPage } from './rating-graph.page';

describe('RatingGraphPage', () => {
  let component: RatingGraphPage;
  let fixture: ComponentFixture<RatingGraphPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RatingGraphPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
