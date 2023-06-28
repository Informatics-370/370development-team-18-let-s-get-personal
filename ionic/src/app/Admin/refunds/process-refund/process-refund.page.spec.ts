import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProcessRefundPage } from './process-refund.page';

describe('ProcessRefundPage', () => {
  let component: ProcessRefundPage;
  let fixture: ComponentFixture<ProcessRefundPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ProcessRefundPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
