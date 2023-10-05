import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { Download } from 'src/app/interfaces/download';
import { FormDownloadComponent } from '../form-download/form-download.component';
import { ConfirmDeleteComponent } from '../confirm-delete/confirm-delete.component';

@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.scss']
})
export class DownloadComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator
  dataTable!: MatTableDataSource<Download>
  data: Download[] = [
    {
      name: "MC-Test Lite v2022.01A",
      link: "/",
      image: "assets/images/VMU.png",
      type: "Full",
      status: false
    },
    {
      name: "MC-Test Lite v2022.01A",
      link: "/",
      image: "assets/images/VMU.png",
      type: "Full",
      status: true
    },
    {
      name: "MC-Test Lite v2022.01A",
      link: "/",
      image: "assets/images/VMU.png",
      type: "Full",
      status: true
    },
    {
      name: "MC-Test Lite v2022.01A",
      link: "/",
      image: "assets/images/VMU.png",
      type: "Full",
      status: false
    },
    {
      name: "MC-Test Lite v2022.01A",
      link: "/",
      image: "assets/images/VMU.png",
      type: "Full",
      status: true
    },
    {
      name: "MC-Test Lite v2022.01A",
      link: "/",
      image: "assets/images/VMU.png",
      type: "Full",
      status: false
    },
    {
      name: "MC-Test Lite v2022.01A",
      link: "/",
      image: "assets/images/VMU.png",
      type: "Full",
      status: true
    },
    {
      name: "MC-Test Lite v2022.01A",
      link: "/",
      image: "assets/images/VMU.png",
      type: "Full",
      status: true
    },
    {
      name: "MC-Test Lite v2022.01A",
      link: "/",
      image: "assets/images/VMU.png",
      type: "Full",
      status: false
    },
    {
      name: "MC-Test Lite v2022.01A",
      link: "/",
      image: "assets/images/VMU.png",
      type: "Full",
      status: true
    },
  ]

  Columns: string[] = [
    'No',
    'Name',
    'Link',
    'Image',
    'Type',
    'status',
    'active'
  ]

  ngOnInit(): void {
    this.dataTable = new MatTableDataSource(this.data)
    this.dataTable.paginator = this.paginator
  }

  constructor(
    private dialog: MatDialog,
  ) {

  }

  openDialogEdit(data: any) {
    this.dialog.open(FormDownloadComponent, {
      data: data
    })
  }

  openDialogConfirmDelete(data: any) {
    this.dialog.open(ConfirmDeleteComponent, {
      data: data
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
    this.dataTable.filter = filterValue.trim().toLowerCase()
    if (this.dataTable.paginator) {
      this.dataTable.paginator.firstPage()
    }
  }
}
