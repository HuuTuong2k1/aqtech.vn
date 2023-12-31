import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RootComponent } from './modules/root/root.component';
import { GeneralSettingComponent } from './modules/general-setting/general-setting.component';
import { HeaderComponent } from './modules/header/header.component';
import { FooterComponent } from './modules/footer/footer.component';
import { BannerComponent } from './modules/banner/banner.component';
import { CustomerComponent } from './modules/customer/customer.component';
import { NewsComponent } from './modules/news/news.component';
import { CommentsComponent } from './modules/comments/commnents.component';
import { ProductComponent } from './modules/product/product.component';
import { AccountComponent } from './modules/account/account.component';
import { DownloadComponent } from './modules/download/download.component';
import { LoginComponent } from './modules/login/login.component';
import { FormProductComponent } from './modules/form-product/form-product.component';
import { QuestionsComponent } from './modules/questions/questions.component';
import { FormNewsComponent } from './modules/form-news/form-news.component';

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
        path: 'doi-tac', component: CustomerComponent, data: {name: 'Đối tác', breadcrumb: 'Admin > Đối tác'}
      },
      {
        path: 'khach-hang', component: CustomerComponent, data: {name: 'Khách hàng', breadcrumb: 'Admin > Khách hàng'}
      },
      {
        path: 'bai-viet', component: NewsComponent, data: {name: 'Bài viết', breadcrumb: 'Admin > Bài viết'}
      },
      {
        path: 'bai-viet/them-bai-viet', component: FormNewsComponent, data: {name: 'Thêm bài viết', breadcrumb: 'Admin > Bài Viết > Thêm bài viết'}
      },
      {
        path: 'bai-viet/hieu-chinh-bai-viet', component: FormNewsComponent, data: {name: 'Hiệu chỉnh bài viết', breadcrumb: 'Admin > Bài Viết > Hiệu chỉnh bài viết'}
      },
      {
        path: 'binh-luan', component: CommentsComponent, data: {name: 'Bình luận', breadcrumb: 'Admin > Bình luận'}
      },
      {
        path: 'cau-hoi', component: QuestionsComponent, data: {name: 'Câu hỏi khách hàng', breadcrumb: 'Admin > Câu hỏi khách hàng'}
      },
      {
        path: 'san-pham', component: ProductComponent, data: {name: 'Sản phẩm', breadcrumb : 'Admin > Sản phẩm'},
      },
      {
        path: 'san-pham/them-san-pham', component: FormProductComponent, data : {name: 'Thêm sản phẩm', breadcrumb : 'Admin > Sản phẩm > Thêm sản phẩm'}
      },
      {
        path: 'san-pham/hieu-chinh-san-pham', component: FormProductComponent, data : {name: 'Hiệu chỉnh sản phẩm', breadcrumb : 'Admin > Sản phẩm > Hiệu chỉnh sản phẩm'}
      },
      {
        path: 'tai-khoan-khach-hang', component: AccountComponent, data: {name: 'Tài khoản', breadcrumb: 'Admin > Tài khoản'}
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
