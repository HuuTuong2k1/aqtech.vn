import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RootComponent } from './modules/root/root.component';
import { SidebarComponent } from './modules/sidebar/sidebar.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatDividerModule} from '@angular/material/divider';
import {MatTreeModule} from '@angular/material/tree';
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
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { ColorPickerModule } from 'ngx-color-picker';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDialogModule } from '@angular/material/dialog';
import { FormHeaderComponent } from './modules/form-header/form-header.component';
import { ConfirmDeleteComponent } from './modules/confirm-delete/confirm-delete.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormBannerCustomerComponent } from './modules/form-banner-customer/form-banner-customer.component';
import { FormAccountComponent } from './modules/form-account/form-account.component';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import { HttpClientModule } from '@angular/common/http';
import { FormDownloadComponent } from './modules/form-download/form-download.component';
import { FormProductComponent } from './modules/form-product/form-product.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { QuestionsComponent } from './modules/questions/questions.component';
import { FormNewsComponent } from './modules/form-news/form-news.component';

@NgModule({
  declarations: [
    AppComponent,
    RootComponent,
    SidebarComponent,
    GeneralSettingComponent,
    HeaderComponent,
    FooterComponent,
    BannerComponent,
    CustomerComponent,
    NewsComponent,
    CommentsComponent,
    ProductComponent,
    AccountComponent,
    DownloadComponent,
    LoginComponent,
    FormHeaderComponent,
    ConfirmDeleteComponent,
    FormBannerCustomerComponent,
    FormAccountComponent,
    FormDownloadComponent,
    FormProductComponent,
    QuestionsComponent,
    FormNewsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatDividerModule,
    MatTreeModule,
    ReactiveFormsModule,
    ColorPickerModule,
    MatSlideToggleModule,
    MatDialogModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    HttpClientModule,
    AngularEditorModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      closeButton: true // Ngăn chặn hiển thị thông báo trùng lặp
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
