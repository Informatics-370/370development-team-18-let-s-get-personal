import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AssignAdminRolePage } from './assign-admin-role.page';

describe('AssignAdminRolePage', () => {
  let component: AssignAdminRolePage;
  let fixture: ComponentFixture<AssignAdminRolePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AssignAdminRolePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
