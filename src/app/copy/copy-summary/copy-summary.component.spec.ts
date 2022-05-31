import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CopySummaryComponent } from './copy-summary.component';

describe('CopySummaryComponent', () => {
  let component: CopySummaryComponent;
  let fixture: ComponentFixture<CopySummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CopySummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CopySummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
