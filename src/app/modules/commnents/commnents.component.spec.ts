import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommnentsComponent } from './commnents.component';

describe('CommnentsComponent', () => {
  let component: CommnentsComponent;
  let fixture: ComponentFixture<CommnentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CommnentsComponent]
    });
    fixture = TestBed.createComponent(CommnentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
