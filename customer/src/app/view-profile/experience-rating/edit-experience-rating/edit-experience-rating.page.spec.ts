import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditExperienceRatingPage } from './edit-experience-rating.page';

describe('EditExperienceRatingPage', () => {
  let component: EditExperienceRatingPage;
  let fixture: ComponentFixture<EditExperienceRatingPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EditExperienceRatingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
