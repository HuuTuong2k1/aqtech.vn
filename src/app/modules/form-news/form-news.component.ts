import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ActivatedRoute } from '@angular/router';
import { NewsService } from 'src/app/services/news.service';
import { ToastrService } from 'ngx-toastr';
import { ShareService } from 'src/app/services/share.service';
import { News } from 'src/app/interfaces/news';

@Component({
  selector: 'app-form-news',
  templateUrl: './form-news.component.html',
  styleUrls: ['./form-news.component.scss']
})
export class FormNewsComponent implements OnInit {
  title: string = ''
  breadcrumb: string = ''
  form!: FormGroup
  dataNews: News[] = []
  idBaiViet!: number
  baiVietEdit!: News

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
    private formfb: FormBuilder,
    private ActiveRoute: ActivatedRoute,
    private NewService: NewsService,
    private toast: ToastrService,
    private share: ShareService
  ) {
    // Lấy id từ params để so với data trong share service
    this.ActiveRoute.queryParams.subscribe(params => {
      this.idBaiViet = params['id']
    })

    const routeData = this.ActiveRoute.snapshot.data
    if(routeData) {
      routeData['name'] ? this.title = routeData['name'] : '';
      routeData['breadcrumb'] ? this.breadcrumb = routeData['breadcrumb'] : '';
    }

    this.share.dataBaiViet.subscribe({
      next: data => {
        this.dataNews = data
      },
      error: err => {
        console.log(err)
      }
    })

  }

  ngOnInit(): void {
    const date = new Date();
    date.setHours(date.getHours() + 7)

    this.form = this.formfb.group({
      tieuDe: ['', Validators.required],
      tomTat: ['', Validators.required],
      noiDung: ['', Validators.required],
      hinhDaiDien: ['', Validators.required],
      doUuTien: [1, Validators.required],
      isNews: [true, Validators.required],
      isHienThi: [true, Validators.required],
      createdTime: [ date.toISOString(), Validators.required],
      createdBy: ['Admin', Validators.required],
      ngayHieuChinh: [date.toISOString(), Validators.required],
      video: ['video demo', Validators.required]
    })

    // Lấy ra phần tử cần edit
    if(this.dataNews) {
      this.dataNews.forEach(item => {
        (item.id == this.idBaiViet) ? this.baiVietEdit = item : '';
      })
    }
  }

  addNews() {
    if(this.form.valid) {
      this.NewService.postData(this.form.value).subscribe({
        next: data => {
          this.toast.success("Thêm bài viết thành công", "Successfully")
        },
        error: err => {
          console.log(err)
          this.toast.error("Thêm bài viết không thành công", "Unsuccessfully")
        }
      })
    }
  }
}
