import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FlasksPage } from './flasks.page';

describe('FlasksPage', () => {
  let component: FlasksPage;
  let fixture: ComponentFixture<FlasksPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(FlasksPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
