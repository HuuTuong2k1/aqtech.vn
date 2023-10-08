import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-general-setting',
  templateUrl: './general-setting.component.html',
  styleUrls: ['./general-setting.component.scss']
})
export class GeneralSettingComponent implements OnInit{
  title: string = ''
  breadcrumb: string = ''
  color: string = '#009047'
  checked: boolean = true
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
    const routeData = this.activeRoute.snapshot.data; // Lấy dữ liệu của tuyến đường
    if (routeData) {
      routeData['name'] ? this.title = routeData['name'] : this.title = ''
      routeData['breadcrumb'] ? this.breadcrumb = routeData['breadcrumb'] : this.breadcrumb = ''
    }
    
    this.form = this.formfb.group({
      namewebsite : ['', Validators.required],
      logo : ['', Validators.required],
      theme : ['', Validators.required],
      title : ['', Validators.required],
      favicon: ['', Validators.required],
      status: [this.checked, Validators.required]
    })
  }

  constructor(
    private formfb: FormBuilder,
    private activeRoute: ActivatedRoute,
  ) {

  }

  changeStatus(event: any) {
    // Lấy giá trị checked từ sự kiện thay đổi
    const isChecked = event.checked;

    // Cập nhật giá trị của trường 'status' trong FormGroup
    this.form.patchValue({ status: isChecked });
  }

  submitForm() {
    this.form.value['theme'] = this.color
    console.log(this.form.value)
  }

}
