import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SizeStatusComponent } from './size-status.component';

describe('SizeStatusComponent', () => {
  let component: SizeStatusComponent;
  let fixture: ComponentFixture<SizeStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SizeStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SizeStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
