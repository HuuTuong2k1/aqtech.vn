import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-form-account',
  templateUrl: './form-account.component.html',
  styleUrls: ['./form-account.component.scss']
})
export class FormAccountComponent implements OnInit{
  check: boolean = true
  form!: FormGroup
  required: boolean = true
  isEmptyEmail: boolean = true
  isEmptyFullName: boolean = true
  isEmptyPhone: boolean = true
  isEmptySex: boolean = true
  isEmptyPass: boolean = true
  isEmptyCFPass: boolean = true

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formfb: FormBuilder,
    private dialoRef: MatDialogRef<FormAccountComponent>,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {
    this.form = this.formfb.group({
      email: [this.data ? this.data.email : '', Validators.required],
      fullname: [this.data ? this.data.fullname : '', Validators.required],
      phone: [this.data ? this.data.phone : '', Validators.required],
      sex: [this.data ? this.data.sex.toString() : '', Validators.required],
      pass: [this.data ? this.data.pass : '', Validators.required],
      cfpass:[this.data ? this.data.pass : '', Validators.required],
      status: [this.data ? this.data.status : true]
    })
  }

  closeDialog() {
    this.dialoRef.close()
  }

  updateAccount() {
    if (this.form.valid) {
      const check = this.checkPass(this.form.value.pass, this.form.value.cfpass)
      check ? this.toast.success('Tạo tài khoản thành công','Successfully !') : ''
    } else {
      this.checkRequied(this.form)
    }
  }

  checkPass(pass: string, confirmPass: string): boolean {
    if (pass.length < 8) {
      this.check = false
      this.toast.error('Mật khẩu phải có ít nhất 8 ký tự', 'Erorr !')
    } else if (pass != confirmPass) {
      this.check = false
      this.toast.error('Nhập lại mật khẩu không trùng khớp', 'Erorr !')
    } else {
      this.check = true
    }
    return this.check
  }

  checkRequied (data: any) {
    data.value.email == '' ? this.toast.error('Bạn chưa nhập Email', 'Error !') : ''
    data.value.fullname == '' ? this.toast.error('Bạn chưa nhập tên đầy đủ', 'Error !') : ''
    data.value.phone == '' ? this.toast.error('Bạn chưa nhập số điện thoại', 'Error !') : ''
    data.value.sex == '' ? this.toast.error('Bạn chưa chọn giới tính', 'Error !') : ''
    data.value.pass == '' ? this.toast.error('Bạn chưa nhập mật khẩu', 'Error !') : ''
    data.value.cfpass == '' ? this.toast.error('Bạn chưa nhập lại mật khẩu', 'Error !') : ''
  }
}
