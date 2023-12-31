import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HeaderService } from 'src/app/services/header.service';
import { catchError, map } from 'rxjs';
import { Header } from 'src/app/interfaces/header';

@Component({
  selector: 'app-form-header',
  templateUrl: './form-header.component.html',
  styleUrls: ['./form-header.component.scss']
})
export class FormHeaderComponent implements OnInit{
  form!: FormGroup
  checked: boolean = true
  listHeader: Header[] = []

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<FormHeaderComponent>,
    private formfb: FormBuilder,
    private toast: ToastrService,
    private HeaderService: HeaderService
  ){}

  ngOnInit(): void {
    this.fetchHeader()
    this.form = this.formfb.group({
      createdBy: ['Admin', Validators.required],
      ten: [this.data ? this.data.ten : '', Validators.required],
      danhMucCha: [this.data ? this.data.danhMucCha : ''],
      urlheader: [this.data ? this.data.urlheader : '', Validators.required],
      isHienThi: [this.data ? this.data.isHienThi : this.checked, Validators.required],
      createdTime: [new Date().toISOString(), Validators.required],
    })
  }

  closeDialog() {
    this.dialogRef.close()
  }

  fetchHeader() {
    this.HeaderService.getHeader().subscribe({
      next: data => {
        this.listHeader = data
      },
      error: err => {
        console.log(err)
      }
    })
  }

  AddHeader() {
    if(this.form.valid) {
      console.log(this.form.value)
      this.HeaderService.addHeader(this.form.value).pipe(
        map(() => 'Thêm header thành công'), // Trả về chuỗi thành công
        catchError((error) => {
          throw error;
        })
      ).subscribe({
        next: res => {
          this.toast.success(res, 'Successfully')
          this.dialogRef.close()
        },
        error: err => {
          this.toast.error(err, 'Unsuccessfully')
          this.dialogRef.close()
        }
      });
    }
  }

  updateHeader(id: number) {
    if(this.form.valid) {
      console.log(this.form.value)
      this.HeaderService.updateHeader(id,this.form.value).pipe(
        map(() => 'Chỉnh sửa header thành công'), // Trả về chuỗi thành công
        catchError((error) => {
          throw error;
        })
      ).subscribe({
        next: res => {
          this.toast.success(res, 'Successfully')
          this.dialogRef.close()
        },
        error: err => {
          console.log(err)
          this.toast.error('Chỉnh sửa header thật bại', 'Unsuccessfully')
          this.dialogRef.close()
        }
      });
    }
  }
}
