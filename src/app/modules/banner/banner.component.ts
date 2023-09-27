import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormBannerCustomerComponent } from '../form-banner-customer/form-banner-customer.component';
import { ConfirmDeleteComponent } from '../confirm-delete/confirm-delete.component';
import { Banner } from 'src/app/interfaces/banner';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements AfterViewInit{
  data: Banner[] = [
    {
      image: 'assets/images/images.jpg',
      description: 'Ảnh kinh doanh',
      link: 'assets/images/images.jpg',
      status: true
    },
    {
      image: 'assets/images/bg-1.jpg',
      description: 'Ảnh giáo dục',
      link: 'assets/images/bg-1.jpg',
      status: false
    },
    {
      image: 'assets/images/images.jpg',
      description: '',
      link: 'assets/images/images.jpg',
      status: true
    },
    {
      image: 'assets/images/images.jpg',
      description: 'Ảnh kinh doanh',
      link: 'assets/images/images.jpg',
      status: true
    },
    {
      image: 'assets/images/images.jpg',
      description: 'Ảnh kinh doanh',
      link: 'assets/images/images.jpg',
      status: true
    },
    {
      image: 'assets/images/images.jpg',
      description: 'Ảnh kinh doanh',
      link: 'assets/images/images.jpg',
      status: true
    },
    {
      image: 'assets/images/images.jpg',
      description: 'Ảnh kinh doanh',
      link: 'assets/images/images.jpg',
      status: true
    },
    {
      image: 'assets/images/images.jpg',
      description: 'Ảnh kinh doanh',
      link: 'assets/images/images.jpg',
      status: true
    },
    {
      image: 'assets/images/images.jpg',
      description: 'Ảnh kinh doanh',
      link: 'assets/images/images.jpg',
      status: true
    },
  ]

  Columns: string[] = [
    'no',
    'image',
    'des',
    'link',
    'status',
    'active'
  ];

  dataTable!: MatTableDataSource<any>
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private dialog: MatDialog,
    private toast: ToastrService
  ){
    this.dataTable = new MatTableDataSource(this.data)
  }

  ngAfterViewInit(): void {
    this.dataTable.paginator = this.paginator
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataTable.filter = filterValue.trim().toLowerCase();

    if (this.dataTable.paginator) {
      this.dataTable.paginator.firstPage();
    }
  }

  openDialogEdit(data: any) {
    this.dialog.open(FormBannerCustomerComponent, {
      data: data
    })
  }

  openDialogConfirmDelete(data: any) {
    this.dialog.open(ConfirmDeleteComponent, {
      data: data
    })
  }
}
