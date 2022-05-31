import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CopyTechnicalsComponent } from './copy-technicals.component';

describe('CopyTechnicalsComponent', () => {
  let component: CopyTechnicalsComponent;
  let fixture: ComponentFixture<CopyTechnicalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CopyTechnicalsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CopyTechnicalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
