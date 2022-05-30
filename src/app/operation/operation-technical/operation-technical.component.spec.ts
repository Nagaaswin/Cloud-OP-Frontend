import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationTechnicalComponent } from './operation-technical.component';

describe('OperationTechnicalComponent', () => {
  let component: OperationTechnicalComponent;
  let fixture: ComponentFixture<OperationTechnicalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperationTechnicalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OperationTechnicalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
