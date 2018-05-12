import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CnrsModalComponent } from './cnrs-modal.component';

describe('CnrsModalComponent', () => {
  let component: CnrsModalComponent;
  let fixture: ComponentFixture<CnrsModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CnrsModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CnrsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
