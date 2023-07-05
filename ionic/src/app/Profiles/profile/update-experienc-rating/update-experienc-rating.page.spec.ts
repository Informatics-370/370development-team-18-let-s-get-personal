import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdateExperiencRatingPage } from './update-experienc-rating.page';

describe('UpdateExperiencRatingPage', () => {
  let component: UpdateExperiencRatingPage;
  let fixture: ComponentFixture<UpdateExperiencRatingPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(UpdateExperiencRatingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
