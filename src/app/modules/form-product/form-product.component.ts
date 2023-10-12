import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor/public-api';
import { Validators } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-form-product',
  templateUrl: './form-product.component.html',
  styleUrls: ['./form-product.component.scss']
})
export class FormProductComponent implements OnInit {
  form!: FormGroup
  title: string = ''
  breadcrumb: string = ''
  checked: boolean = true
  id!: number
  data: any

  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '20rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
  };

  constructor(
    private activeRoute: ActivatedRoute,
    private formfb: FormBuilder,
    private ProductService: ProductService
  ) {}

  ngOnInit(): void {
    const routeData = this.activeRoute.snapshot.data; // Lấy dữ liệu của tuyến đường
    if (routeData) {
      routeData['name'] ? this.title = routeData['name'] : this.title = ''
      routeData['breadcrumb'] ? this.breadcrumb = routeData['breadcrumb'] : this.breadcrumb = ''
    }

    this.activeRoute.queryParams.subscribe(param => {
      this.id = param['id']
    })

    if (this.id) {
      this.fetchDataById(this.id)
      this.form = this.formfb.group({
        tenDanhMuc: ['', Validators.required],
        isNoiBat: [false, Validators.required],
        isHienThi: [ true, Validators.required],
        hinhDaiDien: ['', Validators.required],
        noiDung: ['', Validators.required],
        createdTime: [new Date().toISOString, Validators.required],
        createdBy: ['Admin', Validators.required]
      })
    } else {
      this.form = this.formfb.group({
        tenDanhMuc: [ '', Validators.required],
        hinhDaiDien: ['', Validators.required],
        isNoiBat: [false, Validators.required],
        isHienThi: [true, Validators.required],
        noiDung: ['', Validators.required],
        createdTime: [new Date().toISOString, Validators.required],
        createdBy: ['Admin', Validators.required]
      })
    }

  }

  addProduct() {
    if(this.form.valid) {
      console.log(this.form.value)
    }
  }

  async fetchDataById(id: number) {
    await this.ProductService.getDataById(id).subscribe({
      next: data => {
        this.form = this.formfb.group({
          tenDanhMuc: [data[0] ? data[0].tenDanhMuc : '', Validators.required],
          isNoiBat: [data[0] ? data[0].isNoiBat : false, Validators.required],
          isHienThi: [data[0] ? data[0].isHienThi : true, Validators.required],
          hinhDaiDien: ['', Validators.required],
          createdTime: [new Date().toISOString, Validators.required],
          createdBy: ['Admin', Validators.required]
        })
      },
      error: err => {
        console.log(err)
      }
    })
  }
}
