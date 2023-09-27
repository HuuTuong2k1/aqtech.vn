import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-confirm-delete',
  templateUrl: './confirm-delete.component.html',
  styleUrls: ['./confirm-delete.component.scss']
})
export class ConfirmDeleteComponent {
  constructor(
    private dialogRef: MatDialogRef<ConfirmDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toast: ToastrService
  ) {}

  deleteHeader(data: any) {
    console.log(data)
    try {
      this.closeDialog()
      this.toast.success("Xóa thành công", "Successfully")
    } catch (error) {
      this.toast.error("Xóa không thành công", "error")
    }
  }

  closeDialog() {
    this.dialogRef.close()
  }
}
