import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from 'src/app/interfaces/product';
import { MatPaginator } from '@angular/material/paginator';
import { ConfirmDeleteComponent } from '../confirm-delete/confirm-delete.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, AfterViewInit{
  dataTable!: MatTableDataSource<Product>
  title: string = ''
  breadcrumb: string = ''

  data: Product[] = [
    {
      tenDanhMuc: "MCMix-Pro",
      hinhDaiDien: "assets/images/VMU.png",
      isHienThi: true,
      isNoiBat: true
    },
    {
      tenDanhMuc: "MCMix-Pro",
      hinhDaiDien: "assets/images/VMU.png",
      isHienThi: true,
      isNoiBat: true
    },
    {
      tenDanhMuc: "MCMix-Pro",
      hinhDaiDien: "assets/images/VMU.png",
      isHienThi: true,
      isNoiBat: true
    },
    {
      tenDanhMuc: "MCMix-Pro",
      hinhDaiDien: "assets/images/VMU.png",
      isHienThi: true,
      isNoiBat: true
    },
    {
      tenDanhMuc: "MCMix-Pro",
      hinhDaiDien: "assets/images/VMU.png",
      isHienThi: true,
      isNoiBat: true
    },
    {
      tenDanhMuc: "MCMix-Pro",
      hinhDaiDien: "assets/images/VMU.png",
      isHienThi: true,
      isNoiBat: true
    },
    {
      tenDanhMuc: "Edusoft.NET",
      hinhDaiDien: "assets/images/VMU.png",
      isHienThi: true,
      isNoiBat: true
    },
  ]

  Columns: string[] = [
    'No',
    'Name',
    'Img',
    'Status',
    'Special',
    'Active'
  ]

  constructor(
    private dialog: MatDialog,
    private activeRoute: ActivatedRoute,
  ) {

  }

  @ViewChild(MatPaginator) paginator!: MatPaginator

  ngOnInit(): void {
    const routeData = this.activeRoute.snapshot.data; // Lấy dữ liệu của tuyến đường
    if (routeData) {
      routeData['name'] ? this.title = routeData['name'] : this.title = ''
      routeData['breadcrumb'] ? this.breadcrumb = routeData['breadcrumb'] : this.breadcrumb = ''
    }
    this.dataTable = new MatTableDataSource(this.data)
    this.dataTable.paginator = this.paginator
  }

  ngAfterViewInit(): void {

  }

  openDialogConfirmDelete(id: number) {
    this.dialog.open(ConfirmDeleteComponent, {
      data: id
    })
  }

  applyFilter(event: Event) {
    const valueFilter = (event.target as HTMLInputElement).value
    this.dataTable.filter = valueFilter.trim().toLowerCase()
    if (this.dataTable.paginator) {
      this.dataTable.paginator.firstPage()
    }
  }
}
