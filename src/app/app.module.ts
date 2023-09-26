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
import { PartnerComponent } from './modules/partner/partner.component';
import { CustomerComponent } from './modules/customer/customer.component';
import { NewsComponent } from './modules/news/news.component';
import { CommnentsComponent } from './modules/commnents/commnents.component';
import { ProductComponent } from './modules/product/product.component';
import { AccountComponent } from './modules/account/account.component';
import { DownloadComponent } from './modules/download/download.component';
import { LoginComponent } from './modules/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { HeaderContentComponent } from './modules/header-content/header-content.component';
import { ColorPickerModule } from 'ngx-color-picker';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

@NgModule({
  declarations: [
    AppComponent,
    RootComponent,
    SidebarComponent,
    GeneralSettingComponent,
    HeaderComponent,
    FooterComponent,
    BannerComponent,
    PartnerComponent,
    CustomerComponent,
    NewsComponent,
    CommnentsComponent,
    ProductComponent,
    AccountComponent,
    DownloadComponent,
    LoginComponent,
    HeaderContentComponent,
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
