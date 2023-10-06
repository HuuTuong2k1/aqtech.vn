import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { FormHeaderComponent } from '../form-header/form-header.component';
import { FormBannerCustomerComponent } from '../form-banner-customer/form-banner-customer.component';
import { FormAccountComponent } from '../form-account/form-account.component';
import { FormDownloadComponent } from '../form-download/form-download.component';

@Component({
  selector: 'app-header-content',
  templateUrl: './header-content.component.html',
  styleUrls: ['./header-content.component.scss']
})
export class HeaderContentComponent implements OnInit{
  title: string = ''
  breadcrumb: string = ''

  constructor(
    private activeRoute: ActivatedRoute,
    private dialog: MatDialog,
  ) {

  }

  ngOnInit(): void {
    const routeData = this.activeRoute.snapshot.data; // Lấy dữ liệu của tuyến đường

    if (routeData) {
      routeData['name'] ? this.title = routeData['name'] : this.title = ''
      routeData['breadcrumb'] ? this.breadcrumb = routeData['breadcrumb'] : this.breadcrumb = ''
    }
  }

  openFormAddHeader() {
    this.dialog.open(FormHeaderComponent)
  }

  openFormAddBannerAndCustomer() {
    this.dialog.open(FormBannerCustomerComponent)
  }

  openFormAddAccount() {
    this.dialog.open(FormAccountComponent)
  }

  openFormAddDownload() {
    this.dialog.open(FormDownloadComponent)
  }
}
