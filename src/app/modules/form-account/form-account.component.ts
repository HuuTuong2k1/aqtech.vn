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
  massage!: string
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
      status: [this.data ? this.data.status : false]
    })
  }

  closeDialog() {
    this.dialoRef.close()
  }

  updateAccount() {
    if (this.form.valid) {
      this.checkPass(this.form.value.pass, this.form.value.cfpass) ?
      this.toast.success('Tạo tài khoản thành công', 'Successfully') :
      this.toast.error(this.massage, 'Error')
    } else {
      this.checkRequied(this.form)
    }
  }

  checkPass(pass: string, confirmPass: string): boolean {
    if (pass.length < 8) {
      this.check = false
      this.massage = 'Mật khẩu phải có ít nhất 8 ký tự'
    } else if (pass != confirmPass) {
      this.check = false
      this.massage = 'Nhập lại mật khẩu không trùng khớp'
    } else {
      this.check = true
    }
    return this.check
  }

  checkRequied (data: any) {
    data.value.email == '' ? this.massage = 'Bạn chưa nhập Email' : ''
    this.toast.error(this.massage, 'Error !')
    data.value.fullname == '' ? this.massage = 'Bạn chưa nhập tên đầy đủ' : ''
    this.toast.error(this.massage, 'Error !')
    data.value.phone == '' ? this.massage = 'Bạn chưa nhập số điện thoại' : ''
    this.toast.error(this.massage, 'Error !')
    data.value.sex == '' ? this.massage = 'Bạn chưa chọn giới tính' : ''
    this.toast.error(this.massage, 'Error !')
    data.value.pass == '' ? this.massage = 'Bạn chưa nhập mật khẩu' : ''
    this.toast.error(this.massage, 'Error !')
    data.value.cfpass == '' ? this.massage = 'Bạn chưa nhập lại mật khẩu' : ''
    this.toast.error(this.massage, 'Error !')
  }
}
