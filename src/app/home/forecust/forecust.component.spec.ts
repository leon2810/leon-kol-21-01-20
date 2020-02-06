import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForecustComponent } from './forecust.component';

describe('ForecustComponent', () => {
  let component: ForecustComponent;
  let fixture: ComponentFixture<ForecustComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForecustComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForecustComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
