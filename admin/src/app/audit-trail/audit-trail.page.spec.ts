import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuditTrailPage } from './audit-trail.page';

describe('AuditTrailPage', () => {
  let component: AuditTrailPage;
  let fixture: ComponentFixture<AuditTrailPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AuditTrailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
