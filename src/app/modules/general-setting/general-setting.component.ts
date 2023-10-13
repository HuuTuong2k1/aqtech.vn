import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { GeneralSettingsService } from 'src/app/services/general-settings.service';
import { Settings } from 'src/app/interfaces/settings';

@Component({
  selector: 'app-general-setting',
  templateUrl: './general-setting.component.html',
  styleUrls: ['./general-setting.component.scss']
})
export class GeneralSettingComponent implements OnInit{
  title: string = ''
  breadcrumb: string = ''
  color: string = ''
  checked: boolean = true
  form!: FormGroup
  data: Settings[] = []
  oldLogo: string = ''
  oldFavicon: string = ''
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
    this.fetchData()
    const routeData = this.activeRoute.snapshot.data; // Lấy dữ liệu của tuyến đường
    if (routeData) {
      routeData['name'] ? this.title = routeData['name'] : this.title = ''
      routeData['breadcrumb'] ? this.breadcrumb = routeData['breadcrumb'] : this.breadcrumb = ''
    }
    this.form = this.formfb.group({
      tenWebsite : ['', Validators.required],
      logoLink : ['', Validators.required],
      maTheme : ['', Validators.required],
      title : ['', Validators.required],
      favicon: ['', Validators.required],
    })
  }

  constructor(
    private formfb: FormBuilder,
    private activeRoute: ActivatedRoute,
    private general: GeneralSettingsService
  ) {

  }

  changeStatus(event: any) {
    const isChecked = event.checked;
    this.form.patchValue({ status: isChecked });
  }

  updateSettings() {
    this.form.value['maTheme'] = this.color
    this.form.value['favicon'] ? this.form.value['favicon'] : this.form.value['favicon'] = this.oldFavicon
    this.form.value['logoLink'] ? this.form.value['logoLink'] : this.form.value['logoLink'] = this.oldLogo
    // Chỗ này lỗi nhé, cần phải check valid trước khi lấy xử lý giá trị form
    // if(this.form.valid) {
      console.log(this.form.value);
    // }
  }

  fetchData() {
    this.general.getThietLapChung().subscribe({
      next: data => {
        this.color = data[0].maTheme
        this.oldFavicon = data[0].favicon
        this.oldLogo = data[0].logoLink
        this.form.patchValue({
          tenWebsite : data[0].tenWebsite,
          title : data[0].title,
          maTheme: data[0].maTheme
        })
      },
      error: err => {
        console.log(err)
      }
    })
  }

}
