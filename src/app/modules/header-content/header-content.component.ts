import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { FormHeaderComponent } from '../form-header/form-header.component';
import { FormBannerComponent } from '../form-banner/form-banner.component';

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
    private dialog: MatDialog
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

  openFormAddBanner() {
    this.dialog.open(FormBannerComponent)
  }
}
