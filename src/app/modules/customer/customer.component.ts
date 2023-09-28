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
      image: 'assets/images/TVU.png',
      description: 'Đại học Trà Vinh',
      link: 'assets/images/TVU.png',
      status: true
    },
    {
      image: 'assets/images/van_lang.png',
      description: 'Đại học Văn Lang',
      link: 'assets/images/van_lang.png',
      status: false
    },
    {
      image: 'assets/images/ctu.png',
      description: 'Đại học Cần Thơ',
      link: 'assets/images/ctu.png',
      status: true
    },
    {
      image: 'assets/images/BK.png',
      description: 'Đại học bách khoa',
      link: 'assets/images/BK.png',
      status: false
    },
    {
      image: 'assets/images/VMU.png',
      description: 'Đại học y khoa Vinh',
      link: 'assets/images/VMU.png',
      status: true
    },
    {
      image: 'assets/images/yersin.png',
      description: 'Đại học Yersin',
      link: 'assets/images/yersin.png',
      status: false
    },
    {
      image: 'assets/images/BK.png',
      description: 'Đại học bách khoa',
      link: 'assets/images/BK.png',
      status: true
    },
    {
      image: 'assets/images/SGU.png',
      description: 'Đại học Sài Gòn',
      link: 'assets/images/SGU.png',
      status: true
    },
    {
      image: 'assets/images/ngoai_thuong.png',
      description: 'Đại học ngoại thương',
      link: 'assets/images/ngoai_thuong.png',
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
