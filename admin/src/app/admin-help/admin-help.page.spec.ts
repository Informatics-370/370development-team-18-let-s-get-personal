import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminHelpPage } from './admin-help.page';

describe('AdminHelpPage', () => {
  let component: AdminHelpPage;
  let fixture: ComponentFixture<AdminHelpPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AdminHelpPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
