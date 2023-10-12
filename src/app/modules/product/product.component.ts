import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from 'src/app/interfaces/product';
import { MatPaginator } from '@angular/material/paginator';
import { ConfirmDeleteComponent } from '../confirm-delete/confirm-delete.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit{
  dataTable!: MatTableDataSource<Product>
  title: string = ''
  breadcrumb: string = ''

  data: Product[] = []

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
    private productService: ProductService,
    private route: Router
  ) {

  }

  @ViewChild(MatPaginator) paginator!: MatPaginator

  ngOnInit(): void {
    this.fetchData()
    const routeData = this.activeRoute.snapshot.data; // Lấy dữ liệu của tuyến đường
    if (routeData) {
      routeData['name'] ? this.title = routeData['name'] : this.title = ''
      routeData['breadcrumb'] ? this.breadcrumb = routeData['breadcrumb'] : this.breadcrumb = ''
    }

  }

  openDialogConfirmDelete(id: number, title: string) {
    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      data: {
        id: id,
        title: title
      }
    })

    dialogRef.afterClosed().subscribe(result => {
      this.fetchData()
    })
  }

  openFormEdit(id: number) {
    this.route.navigate(['/san-pham/them-san-pham'], {
      queryParams: {
        id: id
      }
    })
  }

  applyFilter(event: Event) {
    const valueFilter = (event.target as HTMLInputElement).value
    this.dataTable.filter = valueFilter.trim().toLowerCase()
    if (this.dataTable.paginator) {
      this.dataTable.paginator.firstPage()
    }
  }

  fetchData() {
    this.productService.getData().subscribe({
      next: data => {
        this.dataTable = new MatTableDataSource(data)
        this.dataTable.paginator = this.paginator
      },
      error: err => {
        console.log(err)
      }
    })
  }
}
