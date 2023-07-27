import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExperienceRatingPage } from './experience-rating.page';

describe('ExperienceRatingPage', () => {
  let component: ExperienceRatingPage;
  let fixture: ComponentFixture<ExperienceRatingPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ExperienceRatingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
