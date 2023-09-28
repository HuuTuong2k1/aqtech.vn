import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Validators } from '@angular/forms';

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

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formfb: FormBuilder,
    private dialoRef: MatDialogRef<FormAccountComponent>,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {
    this.form = this.formfb.group({
      email: [this.data ? this.data.email : null, Validators.required],
      fullname: [this.data ? this.data.fullname : null, Validators.required],
      phone: [this.data ? this.data.phone : null, Validators.required],
      sex: [this.data ? this.data.sex.toString() : null, Validators.required],
      pass: [this.data ? this.data.pass : null, Validators.required],
      cfpass: ['', Validators.required],
      status: [this.data ? this.data.status : false]
    })
  }

  closeDialog() {
    this.dialoRef.close()
  }

  updateAccount() {
    this.checkPass(this.form.value.pass, this.form.value.cfpass) ? this.toast.success('Tạo tài khoản thành công', 'Successfully') : this.toast.error(this.massage, 'Error')
    // chuyển sex thành kiểu boolean trước khi boolean trước khi gửi về backend
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
}
