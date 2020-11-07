import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnableDisableComponent } from './enable-disable.component';

describe('EnableDisableComponent', () => {
  let component: EnableDisableComponent;
  let fixture: ComponentFixture<EnableDisableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnableDisableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnableDisableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
