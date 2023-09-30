import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { FormAccountComponent } from '../form-account/form-account.component';
import { MatPaginator } from '@angular/material/paginator';
import { Account } from 'src/app/interfaces/account';
import { ConfirmDeleteComponent } from '../confirm-delete/confirm-delete.component';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements AfterViewInit{

  data: Account[] = [
    {
      fullname: "Nguyễn Hữu Tường",
      email: "nhtuong2001@gmail.com",
      phone: "0939566579",
      sex: 'Nam',
      pass: '1234',
      status: true
    },
    {
      fullname: "Nguyễn Hữu Long",
      email: "nhtuong2001@gmail.com",
      phone: "0939566579",
      sex: 'Nam',
      pass: '1234',
      status: false
    },
    {
      fullname: "Nguyễn Hữu Thịnh",
      email: "nhtuong2001@gmail.com",
      phone: "0939566579",
      sex: 'Nam',
      pass: '1234',
      status: true
    },
    {
      fullname: "Phạm Minh Lâm",
      email: "nhtuong2001@gmail.com",
      phone: "0939566579",
      sex: 'Nam',
      pass: '1234',
      status: false
    },
    {
      fullname: "Nguyễn Thị Kim Tuyến",
      email: "nhtuong2001@gmail.com",
      phone: "0939566579",
      sex: 'Nữ',
      pass: '1234',
      status: true
    },
    {
      fullname: "Lê Trường An",
      email: "nhtuong2001@gmail.com",
      phone: "0939566579",
      sex: 'Nam',
      pass: '1234',
      status: true
    },
    {
      fullname: "Dương Hữu Khanh",
      email: "nhtuong2001@gmail.com",
      phone: "0939566579",
      sex: 'Nam',
      pass: '1234',
      status: false
    },
    {
      fullname: "Nguyễn Hoàng Trung",
      email: "nhtuong2001@gmail.com",
      phone: "0939566579",
      sex: 'Nam',
      pass: '1234',
      status: true
    },
    {
      fullname: "Nguyễn Vũ Phương",
      email: "nhtuong2001@gmail.com",
      phone: "0939566579",
      sex: '',
      pass: '1234',
      status: true
    },
  ]

  Columns: string[] = [
    'no',
    'fullname',
    'email',
    'phone',
    'sex',
    'status',
    'active'
  ]

  @ViewChild(MatPaginator) paginator!: MatPaginator
  dataTable!: MatTableDataSource<Account>

  constructor(
    private dialog: MatDialog
  ) {
    this.dataTable = new MatTableDataSource(this.data)
  }

  ngAfterViewInit(): void {
    this.dataTable.paginator = this.paginator
  }

  openDialogEdit(data: any) {
    console.log(data)
    this.dialog.open(FormAccountComponent, {
      data: data
    })
  }

  openDialogConfirmDelete(data: any) {
    this.dialog.open(ConfirmDeleteComponent, {
      data: data
    })
  }

  applyFilter(event: Event) {
    const value = (event.target as HTMLInputElement).value
    this.dataTable.filter = value.trim().toLowerCase()
    if(this.dataTable.paginator) {
      this.dataTable.paginator.firstPage()
    }
  }
}
