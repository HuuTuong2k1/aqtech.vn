import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { Customer } from 'src/app/interfaces/customer';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { FormBannerCustomerComponent } from '../form-banner-customer/form-banner-customer.component';
import { ConfirmDeleteComponent } from '../confirm-delete/confirm-delete.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements AfterViewInit, OnInit{
  data: Customer[] = [
    {
      image: 'assets/images/BK.png',
      description: 'Đại học bách khoa',
      link: 'assets/images/BK.png',
      type: false,
      status: true
    },
    {
      image: 'assets/images/TVU.png',
      description: 'Đại học Trà Vinh',
      link: 'assets/images/TVU.png',
      type: true,
      status: true
    },
    {
      image: 'assets/images/van_lang.png',
      description: 'Đại học Văn Lang',
      link: 'assets/images/van_lang.png',
      type: true,
      status: false
    },
    {
      image: 'assets/images/ctu.png',
      description: 'Đại học Cần Thơ',
      link: 'assets/images/ctu.png',
      type: false,
      status: true
    },
    {
      image: 'assets/images/BK.png',
      description: 'Đại học bách khoa',
      link: 'assets/images/BK.png',
      type: true,
      status: false
    },
    {
      image: 'assets/images/VMU.png',
      description: 'Đại học y khoa Vinh',
      link: 'assets/images/VMU.png',
      type: true,
      status: true
    },
    {
      image: 'assets/images/yersin.png',
      description: 'Đại học Yersin',
      link: 'assets/images/yersin.png',
      type: true,
      status: false
    },
    {
      image: 'assets/images/BK.png',
      description: 'Đại học bách khoa',
      link: 'assets/images/BK.png',
      type: true,
      status: true
    },
    {
      image: 'assets/images/SGU.png',
      description: 'Đại học Sài Gòn',
      link: 'assets/images/SGU.png',
      type: false,
      status: false
    },
    {
      image: 'assets/images/ngoai_thuong.png',
      description: 'Đại học ngoại thương',
      link: 'assets/images/ngoai_thuong.png',
      type: true,
      status: true
    },
    {
      image: 'assets/images/BK.png',
      description: 'Đại học bách khoa',
      link: 'assets/images/BK.png',
      type: true,
      status: true
    },
  ]

  namePage!: string
  Columns: string[] = [
    'no',
    'image',
    'des',
    'link',
    'status',
    'active'
  ]

  dataTable!: MatTableDataSource<any>
  title: string = ''
  breadcrumb: string = ''

  constructor(
    private dialog: MatDialog,
    private activeRoute: ActivatedRoute
  ) {
    this.dataTable = new MatTableDataSource(this.data)
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator

  ngOnInit(): void {
    const routeData = this.activeRoute.snapshot.data; // Lấy dữ liệu của tuyến đường
    if (routeData) {
      routeData['name'] ? this.title = routeData['name'] : this.title = ''
      routeData['breadcrumb'] ? this.breadcrumb = routeData['breadcrumb'] : this.breadcrumb = ''
      this.checkCurrentUrl(this.title)
    }
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

  // True là KH, false là đối tác, do là chỉ làm 1 bảng chung khách hàng + đối tác nhưng ở trang admin lại có 2 trang khách hàng và đối tác nên phải check url để hiển thị
  checkCurrentUrl(namePage: string) {
    if (namePage === 'Khách hàng') {
      this.dataTable.data = this.dataTable.data.filter(e => e.type === true);
    } else {
      this.dataTable.data = this.dataTable.data.filter(e => e.type === false);
    }
  }

  openFormAddCustomer() {
    this.dialog.open(FormBannerCustomerComponent)
  }
}
