import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RootComponent } from './modules/root/root.component';
import { GeneralSettingComponent } from './modules/general-setting/general-setting.component';
import { HeaderComponent } from './modules/header/header.component';
import { FooterComponent } from './modules/footer/footer.component';
import { BannerComponent } from './modules/banner/banner.component';
import { PartnerComponent } from './modules/partner/partner.component';
import { CustomerComponent } from './modules/customer/customer.component';
import { NewsComponent } from './modules/news/news.component';
import { CommnentsComponent } from './modules/commnents/commnents.component';
import { ProductComponent } from './modules/product/product.component';
import { AccountComponent } from './modules/account/account.component';
import { DownloadComponent } from './modules/download/download.component';
import { LoginComponent } from './modules/login/login.component';

const routes: Routes = [
  {
    path: 'login', component: LoginComponent
  },
  {
    path: '', redirectTo: 'thiet-lap-chung', pathMatch: 'full'
  },
  {
    path: '', component: RootComponent,
    children: [
      {
        path: 'thiet-lap-chung', component: GeneralSettingComponent, data: {name: 'Thiết lập chung', breadcrumb: 'Admin > Thiết lập chung'}
      },
      {
        path: 'header', component: HeaderComponent, data: {name: 'Header', breadcrumb: 'Admin > Header'}
      },
      {
        path: 'footer', component: FooterComponent, data: {name: 'Footer', breadcrumb: 'Admin > Footer'}
      },
      {
        path: 'banner', component: BannerComponent, data: {name: 'Banner', breadcrumb: 'Admin > Banner'}
      },
      {
        path: 'doi-tac', component: PartnerComponent, data: {name: 'Đối tác', breadcrumb: 'Admin > Đối tác'}
      },
      {
        path: 'khach-hang', component: CustomerComponent, data: {name: 'Khách hàng', breadcrumb: 'Admin > Khách hàng'}
      },
      {
        path: 'bai-viet', component: NewsComponent, data: {name: 'Bài viết', breadcrumb: 'Admin > Bài viết'}
      },
      {
        path: 'binh-luan', component: CommnentsComponent, data: {name: 'Bình luận', breadcrumb: 'Admin > Bình luận'}
      },
      {
        path: 'san-pham', component: ProductComponent, data: {name: 'Sản phẩm', breadcrumb : 'Admin > Sản phẩm'}
      },
      {
        path: 'tai-khoan-khach-hang', component: AccountComponent, data: {name: 'Tài khoản khách hàng', breadcrumb: 'Admin > Tài khoản khách hàng'}
      },
      {
        path: 'download', component: DownloadComponent, data: {name: 'Download', breadcrumb: 'Admin > Download'}
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
