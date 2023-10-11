import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Validators } from '@angular/forms';
import { BannerService } from 'src/app/services/banner.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-form-banner-customer',
  templateUrl: './form-banner-customer.component.html',
  styleUrls: ['./form-banner-customer.component.scss']
})
export class FormBannerCustomerComponent {
  form!: FormGroup
  checked: boolean = true
  oldImage: string = ''
  pathName: string = ''

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<FormBannerCustomerComponent>,
    private formfb: FormBuilder,
    private toast: ToastrService,
    private BannerService: BannerService,
    private route: ActivatedRoute
  ){}

  ngOnInit(): void {
    this.form = this.formfb.group({
      hinhDaiDien: [''],
      noiDung: [this.data ? this.data.noiDung : '', Validators.required],
      urlbanner: [this.data ? this.data.urlbanner : '', Validators.required],
      isHienThi: [this.data ? this.data.isHienThi : this.checked, Validators.required],
      createdTime: [new Date().toISOString(), Validators.required],
      createdBy: ['Admin', Validators.required]
    });

    console.log(this.data);
    (this.data && this.data.hinhDaiDien) ? this.oldImage = this.data.hinhDaiDien : '';
    this.pathName = window.location.pathname
  }

  closeDialog() {
    this.dialogRef.close()
  }

  update(id: number) {
    this.form.value['hinhDaiDien'] = this.oldImage
    if (this.form.valid) {
      (this.pathName === '/banner') ?
      this.BannerService.putBanner(this.form.value, id).subscribe({
        next: data => {
          this.toast.success("Cập nhật banner thành công", "Successfully")
          this.closeDialog()
        },
        error: err => {
          this.toast.error("Cập nhật banner không thành công", "Unsuccessfully")
          this.closeDialog()
        }
      }) : ''
    }
  }

  add() {
    if (this.form.valid) {
      (this.pathName === '/banner') ?
      this.BannerService.postBanner(this.form.value).subscribe({
        next: data => {
          this.toast.success("Thêm banner thành công", "Successfully")
          this.closeDialog()
        },
        error: err => {
          this.toast.error("Thêm banner không thành công", "Error")
          this.closeDialog()
        }
      }) : ''
    }
  }
}
