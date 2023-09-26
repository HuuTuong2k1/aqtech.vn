import { Component } from '@angular/core';
import { Header } from 'src/app/interfaces/header';
import { MatDialog } from '@angular/material/dialog';
import { FormHeaderComponent } from '../form-header/form-header.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
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
  ]

  constructor(
    private dialog: MatDialog
  ){}

  openForm() {
    this.dialog.open(FormHeaderComponent)
  }

  openDialog(data: any) {
    this.dialog.open(FormHeaderComponent, {
      data: data
    })
  }
}
