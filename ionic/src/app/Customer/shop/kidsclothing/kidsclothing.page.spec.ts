import { ComponentFixture, TestBed } from '@angular/core/testing';
import { KidsclothingPage } from './kidsclothing.page';

describe('KidsclothingPage', () => {
  let component: KidsclothingPage;
  let fixture: ComponentFixture<KidsclothingPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(KidsclothingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
