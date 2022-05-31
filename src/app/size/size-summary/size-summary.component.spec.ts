import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SizeSummaryComponent } from './size-summary.component';

describe('SizeSummaryComponent', () => {
  let component: SizeSummaryComponent;
  let fixture: ComponentFixture<SizeSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SizeSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SizeSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
