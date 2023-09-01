import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SuccessfulDeliveriesPage } from './successful-deliveries.page';

describe('SuccessfulDeliveriesPage', () => {
  let component: SuccessfulDeliveriesPage;
  let fixture: ComponentFixture<SuccessfulDeliveriesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SuccessfulDeliveriesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
