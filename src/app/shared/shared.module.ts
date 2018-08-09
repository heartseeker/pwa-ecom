import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedService } from './shared.service';
import { HeaderComponent } from './components/header/header.component';
import { SideCartAreaComponent } from './components/side-cart-area/side-cart-area.component';
import { BreadcrumbAreaComponent } from './components/breadcrumb-area/breadcrumb-area.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { PaginationComponent } from './components/pagination/pagination.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    HeaderComponent,
    SideCartAreaComponent,
    BreadcrumbAreaComponent,
    FooterComponent,
    PaginationComponent
  ],
  declarations: [
    HeaderComponent,
    SideCartAreaComponent,
    BreadcrumbAreaComponent,
    FooterComponent,
    PaginationComponent,
  ],
  providers: [
    SharedService
  ]
})
export class SharedModule { }
