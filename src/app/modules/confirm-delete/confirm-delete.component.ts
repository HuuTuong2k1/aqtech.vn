import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Header } from 'src/app/interfaces/header';
import { HeaderService } from 'src/app/services/header.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-confirm-delete',
  templateUrl: './confirm-delete.component.html',
  styleUrls: ['./confirm-delete.component.scss']
})
export class ConfirmDeleteComponent implements OnInit{
  title: string = ''

  constructor(
    private dialogRef: MatDialogRef<ConfirmDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toast: ToastrService,
    private HeaderService: HeaderService,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const routeData = this.activeRoute.snapshot.data; // Lấy dữ liệu của tuyến đường
    if (routeData) {
      routeData['name'] ? this.title = routeData['name'] : this.title = ''
    }
  }

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
