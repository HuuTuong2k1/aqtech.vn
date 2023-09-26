import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';

@Component({
  selector: 'app-general-setting',
  templateUrl: './general-setting.component.html',
  styleUrls: ['./general-setting.component.scss']
})
export class GeneralSettingComponent implements OnInit{
  color: string = '#009047'
  form!: FormGroup
  enable_items: string[] = [
    'Banner',
    'Header',
    'Footer',
    'Tin tức',
    'Khách hàng',
    'Đối tác',
    'Điện thoại hổ trợ',
    'Sản phẩm',
    'Thông tin liên hệ',
    'Quảng cáo'
  ]

  first_enable_items = this.enable_items.slice(0, Math.ceil(this.enable_items.length / 2));
  second_enable_items = this.enable_items.slice(Math.ceil(this.enable_items.length / 2));

  ngOnInit(): void {
    this.form = this.formfb.group({
      namewebsite : ['', Validators.required],
      logo : ['', Validators.required],
      theme : ['', Validators.required],
      title : ['', Validators.required],
      favicon: ['', Validators.required]
    })
  }

  constructor(
    private formfb: FormBuilder
  ) {

  }

  submitForm() {
    this.form.value['theme'] = this.color
    console.log(this.form.value)
  }
}
