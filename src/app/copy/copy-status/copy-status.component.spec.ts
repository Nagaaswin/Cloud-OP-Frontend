import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CopyStatusComponent } from './copy-status.component';

describe('CopyStatusComponent', () => {
  let component: CopyStatusComponent;
  let fixture: ComponentFixture<CopyStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CopyStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CopyStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
