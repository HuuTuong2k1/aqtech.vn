import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { Banner } from 'src/app/interfaces/banner';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { FormBannerCustomerComponent } from '../form-banner-customer/form-banner-customer.component';
import { ConfirmDeleteComponent } from '../confirm-delete/confirm-delete.component';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements AfterViewInit{
  data: Banner[] = [
    {
      image: 'assets/images/BK.png',
      description: 'Đại học bách khoa',
      link: 'assets/images/BK.png',
      status: true
    },
    {
      image: 'assets/images/BK.png',
      description: 'Đại học bách khoa',
      link: 'assets/images/BK.png',
      status: true
    },
    {
      image: 'assets/images/BK.png',
      description: 'Đại học bách khoa',
      link: 'assets/images/BK.png',
      status: true
    },
    {
      image: 'assets/images/BK.png',
      description: 'Đại học bách khoa',
      link: 'assets/images/BK.png',
      status: true
    },
    {
      image: 'assets/images/BK.png',
      description: 'Đại học bách khoa',
      link: 'assets/images/BK.png',
      status: true
    },
    {
      image: 'assets/images/BK.png',
      description: 'Đại học bách khoa',
      link: 'assets/images/BK.png',
      status: true
    },
    {
      image: 'assets/images/BK.png',
      description: 'Đại học bách khoa',
      link: 'assets/images/BK.png',
      status: true
    },
    {
      image: 'assets/images/BK.png',
      description: 'Đại học bách khoa',
      link: 'assets/images/BK.png',
      status: true
    },
    {
      image: 'assets/images/BK.png',
      description: 'Đại học bách khoa',
      link: 'assets/images/BK.png',
      status: true
    },
    {
      image: 'assets/images/BK.png',
      description: 'Đại học bách khoa',
      link: 'assets/images/BK.png',
      status: true
    },
    {
      image: 'assets/images/BK.png',
      description: 'Đại học bách khoa',
      link: 'assets/images/BK.png',
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
  ]

  dataTable!: MatTableDataSource<any>

  constructor(
    private dialog: MatDialog
  ) {
    this.dataTable = new MatTableDataSource(this.data)
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator

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
