import { Component, ViewChild, OnInit } from '@angular/core';
import { Header } from 'src/app/interfaces/header';
import { MatDialog } from '@angular/material/dialog';
import { FormHeaderComponent } from '../form-header/form-header.component';
import { ToastrService } from 'ngx-toastr';
import { ConfirmDeleteComponent } from '../confirm-delete/confirm-delete.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { HeaderService } from 'src/app/services/header.service';
import { ActivatedRoute } from '@angular/router';
import { catchError, map } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  Columns: string[] = [
    '#',
    'Tên',
    'Danh mục cha',
    'Link',
    'Trạng thái',
    'Thao tác'
  ];

  title: string = ''
  breadcrumb: string = ''
  dataTable!: MatTableDataSource<Header>
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private dialog: MatDialog,
    private toast: ToastrService,
    private HeaderService: HeaderService,
    private activeRoute: ActivatedRoute,
  ){

  }

  ngOnInit(): void {
    const routeData = this.activeRoute.snapshot.data; // Lấy dữ liệu của tuyến đường
    if (routeData) {
      routeData['name'] ? this.title = routeData['name'] : this.title = ''
      routeData['breadcrumb'] ? this.breadcrumb = routeData['breadcrumb'] : this.breadcrumb = ''
    }
    this.fetchDataHeader()
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataTable.filter = filterValue.trim().toLowerCase();

    if (this.dataTable.paginator) {
      this.dataTable.paginator.firstPage();
    }
  }

  openDialogEdit(data: any) {
    const dialogRef = this.dialog.open(FormHeaderComponent, {
      data: data
    })

    dialogRef.afterClosed().subscribe(result => {
      this.fetchDataHeader();
    });

  }

  openDialogConfirmDelete(id: number, title: string) {
    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      data: {
        id: id,
        title: title
      }
    })
    dialogRef.afterClosed().subscribe(result => {
      this.fetchDataHeader();
    });
  }

  fetchDataHeader() {
    this.HeaderService.getHeader().subscribe({
      next: data => {
        this.dataTable = new MatTableDataSource(data)
        this.dataTable.paginator = this.paginator
      },
      error: err => {
        console.log(err)
      }
    })
  }

  openFormAddHeader() {
    const dialogRef = this.dialog.open(FormHeaderComponent)
    dialogRef.afterClosed().subscribe(result => {
      this.fetchDataHeader();
    });
  }

  changeStatus(newStatus: boolean, id: number, data: any) {
    data.isHienThi = newStatus

    this.HeaderService.updateHeader(id,data).pipe(
      map(() => 'Cập nhật trạng thái header thành công'), // Trả về chuỗi thành công
      catchError((error) => {
        throw error;
      })
    ).subscribe({
      next: res => {
        this.toast.success(res, 'Successfully')
        this.fetchDataHeader()
      },
      error: err => {
        console.log(err)
        this.toast.error('Cập nhật trạng thái header thật bại', 'Unsuccessfully')
      }
    });
  }
}
