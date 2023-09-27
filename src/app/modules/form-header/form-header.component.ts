import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-form-header',
  templateUrl: './form-header.component.html',
  styleUrls: ['./form-header.component.scss']
})
export class FormHeaderComponent implements OnInit{
  form!: FormGroup
  checked: boolean = true

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<FormHeaderComponent>,
    private formfb: FormBuilder,
    private toast: ToastrService
  ){}

  ngOnInit(): void {
    this.form = this.formfb.group({
      name: [this.data ? this.data.name : '', Validators.required],
      parent: [this.data ? this.data.parent : '', Validators.required],
      link: [this.data ? this.data.link : '', Validators.required],
      status: [this.data ? this.data.status : this.checked, Validators.required]
    })
  }

  closeDialog() {
    this.dialogRef.close()
  }

  updateHeader() {
    console.log(this.form.value)
    try {
      this.toast.success('Cập nhật thành công', 'Successfully')
    } catch (Error) {
      this.toast.error('Cập nhật không thành công', 'Unsuccessfully')
    }
  }
}
