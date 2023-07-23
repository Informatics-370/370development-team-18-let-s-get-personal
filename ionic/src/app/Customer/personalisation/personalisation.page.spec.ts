import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PersonalisationPage } from './personalisation.page';

describe('PersonalisationPage', () => {
  let component: PersonalisationPage;
  let fixture: ComponentFixture<PersonalisationPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PersonalisationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
