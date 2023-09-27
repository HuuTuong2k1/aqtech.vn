import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-form-banner-customer',
  templateUrl: './form-banner-customer.component.html',
  styleUrls: ['./form-banner-customer.component.scss']
})
export class FormBannerCustomerComponent {
  form!: FormGroup
  checked: boolean = true
  oldImage: string = ''

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<FormBannerCustomerComponent>,
    private formfb: FormBuilder,
    private toast: ToastrService
  ){}

  ngOnInit(): void {
    this.form = this.formfb.group({
      image: [this.data ? this.data.name : '', Validators.required],
      des: [this.data ? this.data.description : '', Validators.required],
      link: [this.data ? this.data.link : '', Validators.required],
      status: [this.data ? this.data.status : this.checked, Validators.required]
    });

    (this.data && this.data.image) ? this.oldImage = this.data.image : '';
  }

  closeDialog() {
    this.dialogRef.close()
  }

  updateBanner() {
    this.form.value['image'] = this.oldImage
    console.log(this.form.value)
    try {
      this.toast.success('Cập nhật thành công', 'Successfully')
    } catch (Error) {
      this.toast.error('Cập nhật không thành công', 'Unsuccessfully')
    }
  }

  AddBanner() {
    console.log(this.form.value)
    try {
      this.toast.success('Cập nhật thành công', 'Successfully')
    } catch (Error) {
      this.toast.error('Cập nhật không thành công', 'Unsuccessfully')
    }
  }
}
