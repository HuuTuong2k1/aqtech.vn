import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-form-account',
  templateUrl: './form-account.component.html',
  styleUrls: ['./form-account.component.scss']
})

export class FormAccountComponent implements OnInit{
  check: boolean = true
  form!: FormGroup
  required: boolean = true
  hidePass: boolean = true
  hideCFPass: boolean = true
  genderOptions = [
    { value: true, viewValue: 'Nam' },
    { value: false, viewValue: 'Nữ' },
  ];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formfb: FormBuilder,
    private dialoRef: MatDialogRef<FormAccountComponent>,
    private toast: ToastrService,
    private AccountService: AccountService
  ) {}

  ngOnInit(): void {
    this.form = this.formfb.group({
      email: [this.data ? this.data.email : '', [Validators.required, Validators.email]],
      hoTen: [this.data ? this.data.hoTen : '', Validators.required],
      soDienThoai: [this.data ? this.data.soDienThoai : '', Validators.required],
      gioiTinh: [this.data ? this.data.gioiTinh : null],
      password: [this.data ? this.data.password : '', Validators.required],
      cfpassword:[this.data ? this.data.password : '', Validators.required],
      isAdmin: [this.data ? this.data.isAdmin : false, Validators.required],
      createdBy: ['Admin', Validators.required],
      createdTime: [new Date().toISOString(), Validators.required],
      username: ['DemoUsername']
    })
  }

  closeDialog() {
    this.dialoRef.close()
  }

  updateAccount(id: number) {
    if (this.form.valid) {
      this.form.value.id = id
      const check = this.checkPass(this.form.value.password, this.form.value.cfpassword)
      check ?
      this.AccountService.putData(this.form.value, id).subscribe({
        next: data => {
          this.toast.success("Chỉnh sửa tài khoản thành công", "Successfully")
          this.dialoRef.close()
        },
        error: err => {
          console.log(err)
          this.toast.error("Chỉnh sửa tài khoản không thành công", "Unsuccessfully")
          this.dialoRef.close()
        }
      })
      : ''
    }
  }

  addAccount() {
    if (this.form.valid) {
      console.log(typeof(this.form.value.gioiTinh))
      const check = this.checkPass(this.form.value.password, this.form.value.cfpassword)
      check ?
      this.AccountService.postData(this.form.value).subscribe({
        next: data => {
          this.toast.success("Thêm tài khoản thành công", "Successfully")
          this.dialoRef.close()
        },
        error: err => {
          console.log(err)
          this.toast.error("Thêm tài khoản không thành công", "Unsuccessfully")
          this.dialoRef.close()
        }
      })
      : ''
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


}
