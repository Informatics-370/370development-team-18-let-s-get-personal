import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdateTextpricePage } from './update-textprice.page';

describe('UpdateTextpricePage', () => {
  let component: UpdateTextpricePage;
  let fixture: ComponentFixture<UpdateTextpricePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(UpdateTextpricePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
