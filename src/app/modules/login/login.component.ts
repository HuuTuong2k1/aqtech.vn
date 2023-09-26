import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  form!: FormGroup
  isLogin!: false

  constructor(
    private formBuilder: FormBuilder,
    private toast: ToastrService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  loginSubmit() {
    // Xử lý đăng nhập
    // Code tạm để test
    const { username, password } = this.form.value;
    if (username == 'admin' && password == 'admin') {
      this.toast.success('Đăng nhập thành công','Successfully');
      this.route.navigate(['/thiet-lap-chung'])
    } else {
      this.toast.error('Đăng nhập không thành công','Error!');
    }
  }
}
