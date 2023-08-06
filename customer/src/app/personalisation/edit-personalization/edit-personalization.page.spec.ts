import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditPersonalizationPage } from './edit-personalization.page';

describe('EditPersonalizationPage', () => {
  let component: EditPersonalizationPage;
  let fixture: ComponentFixture<EditPersonalizationPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EditPersonalizationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
