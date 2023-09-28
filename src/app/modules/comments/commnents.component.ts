import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { Comment } from 'src/app/interfaces/comment';
import { ConfirmDeleteComponent } from '../confirm-delete/confirm-delete.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-commnents',
  templateUrl: './commnents.component.html',
  styleUrls: ['./commnents.component.scss']
})
export class CommentsComponent implements AfterViewInit{
  data: Comment[] = [
    {
      email: 'nhtuong2001@gmail.com',
      content: 'Bài viết khá hay, cần cung cấp thêm nhiều bài viết như vậy',
      time: '2023-09-28 13:33:00',
      type: true,
      status: true
    },
    {
      email: 'tn732506@gmail.com',
      content: 'Bài viết khá hay, cần cung cấp thêm nhiều bài viết như vậy',
      time: '2023-09-28 13:35:28',
      type: true,
      status: false
    },
    {
      email: 'tn53875@gmail.com',
      content: 'Sản phẩm tốt, cần cải thiện thêm về giao diện sản phẩm',
      time: '2023-09-28 13:39:28',
      type: false,
      status: true
    },
    {
      email: 'tn53875@gmail.com',
      content: 'Sản phẩm tốt, cần cải thiện thêm về giao diện sản phẩm',
      time: '2023-09-28 13:39:28',
      type: false,
      status: true
    },
    {
      email: 'tn53875@gmail.com',
      content: 'Sản phẩm tốt, cần cải thiện thêm về giao diện sản phẩm',
      time: '2023-09-28 13:39:28',
      type: false,
      status: true
    },
    {
      email: 'tn53875@gmail.com',
      content: 'Sản phẩm tốt, cần cải thiện thêm về giao diện sản phẩm',
      time: '2023-09-28 13:39:28',
      type: false,
      status: true
    },
  ]

  Columns: string[] = [
    'no',
    'email',
    'content',
    'time',
    'type',
    'status',
    'active'
  ]

  dataTable!: MatTableDataSource<Comment>

  @ViewChild(MatPaginator) paginator!: MatPaginator
  constructor(
    private dialog: MatDialog
  ) {
    this.dataTable = new MatTableDataSource(this.data)
  }

  ngAfterViewInit(): void {
    this.dataTable.paginator = this.paginator
  }

  openDialogConfirmDelete(data: any) {
    this.dialog.open(ConfirmDeleteComponent, {
      data: data
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataTable.filter = filterValue.trim().toLowerCase();
    if (this.dataTable.paginator) {
      this.dataTable.paginator.firstPage();
    }
  }
}
