import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { Comment } from 'src/app/interfaces/comment';
import { ConfirmDeleteComponent } from '../confirm-delete/confirm-delete.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { CommentService } from 'src/app/services/comment.service';
import { format } from 'date-fns';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-commnents',
  templateUrl: './commnents.component.html',
  styleUrls: ['./commnents.component.scss']
})
export class CommentsComponent implements OnInit, AfterViewInit{
  Columns: string[] = [
    'no',
    'username',
    'content',
    'time',
    'type',
    'status',
    'active'
  ]

  dataTable!: MatTableDataSource<Comment>
  title: string = ''
  breadcrumb: string = ''

  @ViewChild(MatPaginator) paginator!: MatPaginator
  constructor(
    private dialog: MatDialog,
    private CommentService: CommentService,
    private activeRoute: ActivatedRoute,
  ) {
    // this.dataTable = new MatTableDataSource(this.data)
  }

  ngOnInit(): void {
    const routeData = this.activeRoute.snapshot.data; // Lấy dữ liệu của tuyến đường
    if (routeData) {
      routeData['name'] ? this.title = routeData['name'] : this.title = ''
      routeData['breadcrumb'] ? this.breadcrumb = routeData['breadcrumb'] : this.breadcrumb = ''
    }
    this.getListComment()
  }

  ngAfterViewInit(): void {
    // this.dataTable.paginator = this.paginator
  }

  openDialogConfirmDelete(id: number, title: string) {
    this.dialog.open(ConfirmDeleteComponent, {
      data: {
        id: id,
        title: title
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataTable.filter = filterValue.trim().toLowerCase();
    if (this.dataTable.paginator) {
      this.dataTable.paginator.firstPage();
    }
  }

  getListComment() {
    this.CommentService.getComment().subscribe({
      next: data => {
        this.dataTable = new MatTableDataSource(data)
        this.dataTable.paginator = this.paginator
      },
      error: err => {
        console.log(err)
      }
    })
  }

  formatDate(data: any): any {
    const inputDate = new Date(data);
    return format(inputDate, "dd/MM/yyyy HH:mm:ss")
  }
}
