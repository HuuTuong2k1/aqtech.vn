import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBannerCustomerComponent } from './form-banner-customer.component';

describe('FormBannerComponent', () => {
  let component: FormBannerCustomerComponent;
  let fixture: ComponentFixture<FormBannerCustomerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormBannerCustomerComponent]
    });
    fixture = TestBed.createComponent(FormBannerCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
