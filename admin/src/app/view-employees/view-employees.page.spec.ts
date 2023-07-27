import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewEmployeesPage } from './view-employees.page';

describe('ViewEmployeesPage', () => {
  let component: ViewEmployeesPage;
  let fixture: ComponentFixture<ViewEmployeesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ViewEmployeesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
