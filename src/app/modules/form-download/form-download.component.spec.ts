import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDownloadComponent } from './form-download.component';

describe('FormDownloadComponent', () => {
  let component: FormDownloadComponent;
  let fixture: ComponentFixture<FormDownloadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormDownloadComponent]
    });
    fixture = TestBed.createComponent(FormDownloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
