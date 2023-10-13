import { Component, OnInit } from '@angular/core';
import {NestedTreeControl} from '@angular/cdk/tree';
import {MatTreeNestedDataSource} from '@angular/material/tree';
import { Router} from '@angular/router';

interface sidebarNode {
  name: string;
  link: string;
  icon: string;
  current: boolean;
  children?: sidebarNode[];
}

const TREE_DATA: sidebarNode[] = [
  {
    name: 'Thiết lập chung',
    link: 'thiet-lap-chung',
    icon: 'settings',
    current: false,
  },
  {
    name: 'Header',
    link: 'header',
    icon: 'description',
    current: false,
  },
  {
    name: 'Footer',
    link: 'footer',
    icon: 'contact_page',
    current: false,
  },
  {
    name: 'Banner',
    link: 'banner',
    icon: 'collections',
    current: false,
  },
  {
    name: 'Đối tác',
    link: 'doi-tac',
    icon: 'supervised_user_circle',
    current: false,
  },
  {
    name: 'Khách hàng',
    link: 'khach-hang',
    icon: 'supervised_user_circle',
    current: false,
  },
  {
    name: 'Bài viết',
    link: 'bai-viet',
    icon: 'post_add',
    current: false,
  },
  {
    name: 'Bình luận',
    link: 'binh-luan',
    icon: 'speaker_notes',
    current: false,
  },
  {
    name: 'Câu hỏi',
    link: 'cau-hoi',
    icon: 'speaker_notes',
    current: false,
  },
  {
    name: 'Sản phẩm',
    link: 'san-pham',
    icon: 'production_quantity_limits',
    current: false,
  },
  {
    name: 'Tài khoản người dùng',
    link: 'tai-khoan-khach-hang',
    icon: 'account_circle',
    current: false,
  },
  {
    name: 'Download',
    link: 'download',
    icon: 'cloud_download',
    current: false,
  }
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit{
  collapsed = true;

  treeControl = new NestedTreeControl<sidebarNode>(node => node.children);
  dataSource = new MatTreeNestedDataSource<sidebarNode>();

  constructor(
    private router: Router,
  ) {
    this.dataSource.data = TREE_DATA;

  }

  ngOnInit(): void {

  }

  hasChild = (_: number, node: sidebarNode) => !!node.children && node.children.length > 0;
}
