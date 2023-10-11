import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormBannerCustomerComponent } from '../form-banner-customer/form-banner-customer.component';
import { ConfirmDeleteComponent } from '../confirm-delete/confirm-delete.component';
import { Banner } from 'src/app/interfaces/banner';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { BannerService } from 'src/app/services/banner.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit{
  title: string = ''
  breadcrumb: string = ''

  Columns: string[] = [
    'no',
    'image',
    'des',
    'link',
    'status',
    'active'
  ];

  dataTable!: MatTableDataSource<Banner>
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private dialog: MatDialog,
    private toast: ToastrService,
    private activeRoute: ActivatedRoute,
    private BannerService: BannerService
  ){}

  ngOnInit(): void {
    const routeData = this.activeRoute.snapshot.data; // Lấy dữ liệu của tuyến đường
    if (routeData) {
      routeData['name'] ? this.title = routeData['name'] : this.title = ''
      routeData['breadcrumb'] ? this.breadcrumb = routeData['breadcrumb'] : this.breadcrumb = ''
    }

    this.getBanner()
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
      this.getBanner()
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
      this.getBanner()
    })
  }

  openFormAddBannerCustomer() {
    const dialogRef = this.dialog.open(FormBannerCustomerComponent)
    dialogRef.afterClosed().subscribe(res => {
      this.getBanner()
    })
  }

  getBanner() {
    this.BannerService.getBanner().subscribe({
      next: data => {
        this.dataTable = new MatTableDataSource(data)
        this.dataTable.paginator = this.paginator
      },
      error: err => {
        console.log(err)
      }
    })
  }

  updateStatus(newStatus: boolean, data: any, id: number) {
    data.isHienThi = newStatus
    this.BannerService.putBanner(data, id).subscribe({
      next: res => {
        this.toast.success('Cập nhật trạng thái thành công', 'Successfully')
        this.getBanner()
      },
      error: err => {
        this.toast.error('Cập nhật trạng thái không thành công', 'Unsuccessfullt')
      }
    })
  }
}
