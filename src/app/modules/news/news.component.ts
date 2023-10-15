import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { News } from 'src/app/interfaces/news';
import { MatPaginator } from '@angular/material/paginator';
import { NewsService } from 'src/app/services/news.service';
import { format } from 'date-fns';
import { ConfirmDeleteComponent } from '../confirm-delete/confirm-delete.component';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ShareService } from 'src/app/services/share.service';

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
    private NewService: NewsService,
    private dialog: MatDialog,
    private toast: ToastrService,
    private share: ShareService,
    private route: Router
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
    this.dialog.open(ConfirmDeleteComponent, {
      data: {
        id: id,
        title: title
      }
    }).afterClosed().subscribe(result => {
      this.fetchData()
    })
  }

  openFormEdit(id: number) {
    this.route.navigate(['/bai-viet/hieu-chinh-bai-viet'], {
      queryParams: {
        id: id
      }
    })
  }

  fetchData() {
    this.NewService.getData().subscribe({
      next: data => {
        this.dataTable = new MatTableDataSource(data)
        this.dataTable.paginator = this.paginator
        this.share.setData(data)
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

  changeStatus(newStatus: boolean, data: any) {
    const date = new Date()
    date.setHours(date.getHours() + 7)
    data['isHienThi'] = newStatus
    data['ngayHieuChinh'] = date.toISOString()
    console.log(data)
    this.NewService.putData(data.id, data).subscribe({
      next: res => {
        this.toast.success("Thay đổi trạng thái thành công", "Successfully")
        this.fetchData()
      },
      error: err => {
        this.toast.error("Thay đổi trạng thái không thành công", "Unsuccessfully")
      }
    })
  }
}
