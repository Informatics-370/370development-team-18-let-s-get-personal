import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditstockitemcoloursPage } from './editstockitemcolours.page';

describe('EditstockitemcoloursPage', () => {
  let component: EditstockitemcoloursPage;
  let fixture: ComponentFixture<EditstockitemcoloursPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EditstockitemcoloursPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
