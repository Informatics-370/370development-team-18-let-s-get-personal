import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterOtpPage } from './register-otp.page';

describe('RegisterOtpPage', () => {
  let component: RegisterOtpPage;
  let fixture: ComponentFixture<RegisterOtpPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RegisterOtpPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
