import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-form-download',
  templateUrl: './form-download.component.html',
  styleUrls: ['./form-download.component.scss']
})
export class FormDownloadComponent implements OnInit{

  form!: FormGroup
  checked: boolean = true
  oldImage: string = ''

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<FormDownloadComponent>,
    private formfb: FormBuilder
  ){

  }

  ngOnInit(): void {
    this.form = this.formfb.group({
      image: [this.data ? this.data.iamge : '', Validators.required],
      name: [this.data ? this.data.name : '', Validators.required],
      link: [this.data ? this.data.link : '', Validators.required],
      type: [this.data ? this.data.type : '', Validators.required],
      status: [this.data ? this.data.status : this.checked, Validators.required]
    });

    (this.data && this.data.image) ? this.oldImage = this.data.image : '';
  }

  closeDialog() {
    this.dialogRef.close()
  }

  updateDownload() {
    this.form.value['image'] = this.oldImage
    console.log(this.form.value)
  }

  addDownload() {
    console.log(this.form.value)
  }
}
