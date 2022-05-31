import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SizeTechnicalsComponent } from './size-technicals.component';

describe('SizeTechnicalsComponent', () => {
  let component: SizeTechnicalsComponent;
  let fixture: ComponentFixture<SizeTechnicalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SizeTechnicalsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SizeTechnicalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
