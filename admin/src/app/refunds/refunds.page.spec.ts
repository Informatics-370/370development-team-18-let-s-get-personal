import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RefundsPage } from './refunds.page';

describe('RefundsPage', () => {
  let component: RefundsPage;
  let fixture: ComponentFixture<RefundsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RefundsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
