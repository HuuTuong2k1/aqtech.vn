import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ActivatedRoute } from '@angular/router';
import { NewsService } from 'src/app/services/news.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-form-news',
  templateUrl: './form-news.component.html',
  styleUrls: ['./form-news.component.scss']
})
export class FormNewsComponent implements OnInit{
  title: string = ''
  breadcrumb: string = ''
  form!: FormGroup

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
    private toast: ToastrService
  ) {

  }

  ngOnInit(): void {
    this.form = this.formfb.group({
      tieuDe: ['', Validators.required],
      tomTat: ['', Validators.required],
      noiDung: ['', Validators.required],
      hinhDaiDien: ['', Validators.required],
      doUuTien: [1, Validators.required],
      isNews: [true, Validators.required],
      isHienThi: [true, Validators.required],
      createdTime: [ new Date().toISOString(), Validators.required],
      createdBy: ['Admin', Validators.required],
      ngayHieuChinh: [new Date().toISOString(), Validators.required],
      video: ['video demo', Validators.required]
    })

    const routeData = this.ActiveRoute.snapshot.data
    if(routeData) {
      routeData['name'] ? this.title = routeData['name'] : '';
      routeData['breadcrumb'] ? this.breadcrumb = routeData['breadcrumb'] : '';
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
