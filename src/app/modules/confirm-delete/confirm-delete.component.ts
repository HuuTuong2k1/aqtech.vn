import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Header } from 'src/app/interfaces/header';
import { HeaderService } from 'src/app/services/header.service';

@Component({
  selector: 'app-confirm-delete',
  templateUrl: './confirm-delete.component.html',
  styleUrls: ['./confirm-delete.component.scss']
})
export class ConfirmDeleteComponent {
  constructor(
    private dialogRef: MatDialogRef<ConfirmDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toast: ToastrService,
    private HeaderService: HeaderService
  ) {}

  deleteHeader(id: number) {
    this.HeaderService.deleteHeader(id).subscribe({
      next: res => {
        this.toast.success(res, 'Successfully')
        this.dialogRef.close();
      },
      error: err => {
        this.toast.success(err, 'Unsuccessfully')
        this.dialogRef.close();
      }
    });
  }

  closeDialog() {
    this.dialogRef.close()
  }
}
