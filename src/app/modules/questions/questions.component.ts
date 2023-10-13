import { Component, ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { Question } from 'src/app/interfaces/question';
import { format } from 'date-fns';
import { QuestionService } from 'src/app/services/question.service';
import { ConfirmDeleteComponent } from '../confirm-delete/confirm-delete.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit{
  title: string = ''
  breadcrumb: string = ''
  dataTable!: MatTableDataSource<Question>
  Columns: string[] = [
    'stt',
    'name',
    'email',
    'content',
    'datetime',
    'status',
    'active'
  ]

  applyFilter(event: Event) {
    const valueFilter = (event.target as HTMLInputElement).value
    this.dataTable.filter = valueFilter.trim().toLowerCase()
    if(this.dataTable.paginator) {
      this.dataTable.paginator.firstPage()
    }
  }

  constructor(
    private QuestionService: QuestionService,
    private ActiveRoute: ActivatedRoute,
    private dialog: MatDialog,
    private toast: ToastrService
  ){}

  ngOnInit(): void {
    if(this.ActiveRoute.snapshot.data) {
      this.title = this.ActiveRoute.snapshot.data['name']
      this.breadcrumb = this.ActiveRoute.snapshot.data['breadcrumb']
    }
    this.fetchData()
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator

  formatDate(data: any): any {
    const inputDate = new Date(data);
    return format(inputDate, "dd/MM/yyyy HH:mm:ss")
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

  fetchData() {
    this.QuestionService.getData().subscribe({
      next: data => {
        this.dataTable = new MatTableDataSource(data)
        this.dataTable.paginator = this.paginator
      },
      error: err => {
        console.log(err)
      }
    })
  }

  changeStatus(newstatus: boolean, data: any) {
    data.isHienThi = newstatus
    console.log(data)
    this.QuestionService.putData(data, data.id).subscribe({
      next: data => {
        console.log(data)
        this.toast.success("Thay đổi trạng thái thành công", "Successfully")
      },
      error: err => {
        this.toast.error("Thay đổi trạng thái không thành công", "Unsuccessfully")
      }
    })
  }
}
