import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WaterbottlesPage } from './waterbottles.page';

describe('WaterbottlesPage', () => {
  let component: WaterbottlesPage;
  let fixture: ComponentFixture<WaterbottlesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(WaterbottlesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
