import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { Header } from 'src/app/interfaces/header';
import { MatDialog } from '@angular/material/dialog';
import { FormHeaderComponent } from '../form-header/form-header.component';
import { ToastrService } from 'ngx-toastr';
import { ConfirmDeleteComponent } from '../confirm-delete/confirm-delete.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterViewInit{
  data: Header[] = [
    {
      name: 'Home',
      parent: '',
      link: 'home',
      status: true
    },
    {
      name: 'About us',
      parent: '',
      link: 'about-us',
      status: true
    },
    {
      name: 'Product',
      parent: '',
      link: '',
      status: false
    },
    {
      name: 'MCMix-PRO',
      parent: 'Product',
      link: 'MCMix-PRO',
      status: true
    },
    {
      name: 'MCBank',
      parent: 'Product',
      link: 'MCBank',
      status: true
    },
    {
      name: 'MCTest-Life',
      parent: 'Product',
      link: 'MCTest-Life',
      status: true
    },
    {
      name: 'MCTest-Online',
      parent: 'Product',
      link: 'MCTest-Online',
      status: false
    },
    {
      name: 'EduSoft.Net',
      parent: 'Product',
      link: 'EduSoft.Net',
      status: false
    },
    {
      name: 'EduSoft.Net',
      parent: 'Product',
      link: 'EduSoft.Net',
      status: false
    },
    {
      name: 'Edu-Mobile',
      parent: 'Product',
      link: 'Edu-Mobile',
      status: true
    },
    {
      name: 'Edu-App',
      parent: 'Product',
      link: 'Edu-app',
      status: true
    },
  ]

  Columns: string[] = [
    'Tên',
    'Danh mục cha',
    'Link',
    'Trạng thái',
    'Thao tác'
  ];

  dataTable!: MatTableDataSource<any>
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private dialog: MatDialog,
    private toast: ToastrService
  ){

  }

  ngOnInit(): void {
    this.dataTable = new MatTableDataSource(this.data);
  }

  ngAfterViewInit(): void {
    this.dataTable.paginator = this.paginator; // Gắn paginator ở đây
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
    this.dialog.open(ConfirmDeleteComponent, {
      data: data
    })
  }

  deleteHeader() {
    try {
      this.toast.success('Xóa thành công', 'Successfully')
    } catch (Error) {
      this.toast.error('Xóa không thành công', 'Unsuccessfully')
    }
  }
}
