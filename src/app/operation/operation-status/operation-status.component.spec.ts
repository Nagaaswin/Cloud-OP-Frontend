import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationStatusComponent } from './operation-status.component';

describe('OperationStatusComponent', () => {
  let component: OperationStatusComponent;
  let fixture: ComponentFixture<OperationStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperationStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OperationStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
