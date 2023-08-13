import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdateImagepricePage } from './update-imageprice.page';

describe('UpdateImagepricePage', () => {
  let component: UpdateImagepricePage;
  let fixture: ComponentFixture<UpdateImagepricePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(UpdateImagepricePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
