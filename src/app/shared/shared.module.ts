// modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// components
import { HeaderComponent } from './components/header/header.component';
import { SideCartAreaComponent } from './components/side-cart-area/side-cart-area.component';
import { BreadcrumbAreaComponent } from './components/breadcrumb-area/breadcrumb-area.component';
import { FooterComponent } from './components/footer/footer.component';
import { PaginationComponent } from './components/pagination/pagination.component';

// services
import { CategoryService } from './services/category/category.service';
import { SharedService } from './shared.service';
import { ProductService } from './services/product/product.service';


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
    SharedService,
    CategoryService,
    ProductService
  ]
})
export class SharedModule { }
