import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditDeliverycompanyPage } from './edit-deliverycompany.page';

describe('EditDeliverycompanyPage', () => {
  let component: EditDeliverycompanyPage;
  let fixture: ComponentFixture<EditDeliverycompanyPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EditDeliverycompanyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
