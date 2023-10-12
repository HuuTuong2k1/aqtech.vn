import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { FormAccountComponent } from '../form-account/form-account.component';
import { MatPaginator } from '@angular/material/paginator';
import { Account } from 'src/app/interfaces/account';
import { ConfirmDeleteComponent } from '../confirm-delete/confirm-delete.component';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit{

  title: string = ''
  breadcrumb: string = ''
  data: Account[] = []

  Columns: string[] = [
    'no',
    'fullname',
    'email',
    'phone',
    'sex',
    'type',
    'active'
  ]

  @ViewChild(MatPaginator) paginator!: MatPaginator
  dataTable!: MatTableDataSource<Account>

  constructor(
    private dialog: MatDialog,
    private activeRoute: ActivatedRoute,
    private AccountService:AccountService
  ) {
  }

  ngOnInit(): void {
    this.fetchData()
    const routeData = this.activeRoute.snapshot.data; // Lấy dữ liệu của tuyến đường
    if (routeData) {
      routeData['name'] ? this.title = routeData['name'] : this.title = ''
      routeData['breadcrumb'] ? this.breadcrumb = routeData['breadcrumb'] : this.breadcrumb = ''
    }
  }

  openDialogEdit(data: any) {
    const dialogRef = this.dialog.open(FormAccountComponent, {
      data: data
    })
    dialogRef.afterClosed().subscribe(result => {
      this.fetchData()
    })
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

  applyFilter(event: Event) {
    const value = (event.target as HTMLInputElement).value
    this.dataTable.filter = value.trim().toLowerCase()
    if(this.dataTable.paginator) {
      this.dataTable.paginator.firstPage()
    }
  }

  openFormAddAccount() {
    const dialogRef = this.dialog.open(FormAccountComponent)
    dialogRef.afterClosed().subscribe(result => {
      this.fetchData()
    })
  }

  fetchData() {
    this.AccountService.getData().subscribe({
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
