import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { Partner } from 'src/app/interfaces/partner';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { FormBannerCustomerComponent } from '../form-banner-customer/form-banner-customer.component';
import { ConfirmDeleteComponent } from '../confirm-delete/confirm-delete.component';
import { ActivatedRoute } from '@angular/router';
import { PartnerService } from 'src/app/services/partner.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit{
  namePage!: string
  Columns: string[] = [
    'no',
    'image',
    'des',
    'link',
    'status',
    'active'
  ]

  dataTable!: MatTableDataSource<Partner>
  title: string = ''
  breadcrumb: string = ''

  constructor(
    private dialog: MatDialog,
    private activeRoute: ActivatedRoute,
    private PartnerService: PartnerService,
    private toast: ToastrService
  ) {}

  @ViewChild(MatPaginator) paginator!: MatPaginator

  ngOnInit(): void {
    const routeData = this.activeRoute.snapshot.data; // Lấy dữ liệu của tuyến đường
    if (routeData) {
      routeData['name'] ? this.title = routeData['name'] : this.title = ''
      routeData['breadcrumb'] ? this.breadcrumb = routeData['breadcrumb'] : this.breadcrumb = ''
    }
    this.fetchData()
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataTable.filter = filterValue.trim().toLowerCase();
    if (this.dataTable.paginator) {
      this.dataTable.paginator.firstPage();
    }
  }

  openDialogEdit(data: any) {
    const dialogRef = this.dialog.open(FormBannerCustomerComponent, {
      data: data
    })
    dialogRef.afterClosed().subscribe(res => {
      this.fetchData()
    })
  }

  openDialogConfirmDelete(id: number, title: string) {
    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      data: {
        id: id,
        title: title
      }
    })
    dialogRef.afterClosed().subscribe(res => {
      this.fetchData()
    })
  }

  openFormAddCustomer() {
    const dialogRef = this.dialog.open(FormBannerCustomerComponent)
    dialogRef.afterClosed().subscribe(res => {
      this.fetchData()
    })
  }

  fetchData() {
    this.PartnerService.getData().subscribe({
      next: data => {
        this.dataTable = new MatTableDataSource(data)
        if (this.title === 'Khách hàng') {
          this.dataTable.data = this.dataTable.data.filter(e => e.loai === "Khách hàng");
        } else {
          this.dataTable.data = this.dataTable.data.filter(e => e.loai === "Đối tác");
        }
        this.dataTable.paginator = this.paginator
      },
      error: err => {
        console.log(err)
      }
    })
  }

  updateStatus(newStatus: boolean, data: any, id: number) {
    data.isHienThi = newStatus
    this.PartnerService.putData(data, id).subscribe({
      next: res => {
        this.toast.success('Cập nhật trạng thái thành công', 'Successfully')
        this.fetchData()
      },
      error: err => {
        this.toast.error('Cập nhật trạng thái không thành công', 'Unsuccessfully')
      }
    })
  }
}
