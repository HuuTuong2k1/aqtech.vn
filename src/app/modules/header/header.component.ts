import { Component, ViewChild, OnInit } from '@angular/core';
import { Header } from 'src/app/interfaces/header';
import { MatDialog } from '@angular/material/dialog';
import { FormHeaderComponent } from '../form-header/form-header.component';
import { ToastrService } from 'ngx-toastr';
import { ConfirmDeleteComponent } from '../confirm-delete/confirm-delete.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { HeaderService } from 'src/app/services/header.service';

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

  dataTable!: MatTableDataSource<Header>
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private dialog: MatDialog,
    private toast: ToastrService,
    private HeaderService: HeaderService
  ){

  }

  ngOnInit(): void {
    this.fetchDataHeader()
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataTable.filter = filterValue.trim().toLowerCase();

    if (this.dataTable.paginator) {
      this.dataTable.paginator.firstPage();
    }
  }

  openDialog(data: any) {
    this.dialog.open(FormHeaderComponent, {
      data: data
    })
  }

  openDialogConfirmDelete(data: any) {
    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      data: data
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
}
