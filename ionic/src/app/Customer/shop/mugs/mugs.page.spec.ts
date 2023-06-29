import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MugsPage } from './mugs.page';

describe('MugsPage', () => {
  let component: MugsPage;
  let fixture: ComponentFixture<MugsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MugsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
