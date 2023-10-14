import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { News } from 'src/app/interfaces/news';
import { MatPaginator } from '@angular/material/paginator';
import { NewsService } from 'src/app/services/news.service';
import { format } from 'date-fns';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit{
  title: string = ''
  breadcrumb: string = ''
  dataTable!: MatTableDataSource<News>
  Columns: string[] = [
    'Ưu tiên',
    'Tiêu đề',
    'Mô tả ngắn',
    'Hình đại diện',
    'Ngày đăng',
    'Ngày chỉnh sửa',
    'Người đăng',
    'Trạng thái',
    'Thao tác'
  ]
  @ViewChild(MatPaginator) paginator!: MatPaginator

  constructor(
    private activeRoute: ActivatedRoute,
    private route: Router,
    private NewService: NewsService
  ) {}

  ngOnInit(): void {
    this.fetchData()
    const routeData = this.activeRoute.snapshot.data; // Lấy dữ liệu của tuyến đường
    if (routeData) {
      routeData['name'] ? this.title = routeData['name'] : this.title = ''
      routeData['breadcrumb'] ? this.breadcrumb = routeData['breadcrumb'] : this.breadcrumb = ''
    }
  }

  applyFilter(event: Event) {
    const valueFliter = (event.target as HTMLInputElement).value
    this.dataTable.filter = valueFliter.trim().toLowerCase()
    if(this.dataTable.paginator) {
      this.dataTable.paginator.firstPage()
    }
  }

  openDialogConfirmDelete(id: number, title: string) {

  }

  openFormEdit(id: number) {

  }

  fetchData() {
    this.NewService.getData().subscribe({
      next: data => {
        this.dataTable = new MatTableDataSource(data)
        this.dataTable.paginator = this.paginator
      },
      error: err => {
        console.log(err)
      }
    })
  }

  formatDate(date: string): string {
    const inputDate = new Date(date)
    return format(inputDate, "dd/MM/yyyy HH:mm:ss")
  }
}
