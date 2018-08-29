// modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// components
import { HeaderComponent } from './components/header/header.component';
import { SideCartAreaComponent } from './components/side-cart-area/side-cart-area.component';
import { BreadcrumbAreaComponent } from './components/breadcrumb-area/breadcrumb-area.component';
import { FooterComponent } from './components/footer/footer.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { SnackbarComponent } from './components/snackbar/snackbar.component';


// services
import { CategoryService } from './services/category/category.service';
import { SharedService } from './shared.service';
import { ProductService } from './services/product/product.service';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    HeaderComponent,
    SideCartAreaComponent,
    BreadcrumbAreaComponent,
    FooterComponent,
    PaginationComponent,
    SnackbarComponent,
  ],
  declarations: [
    HeaderComponent,
    SideCartAreaComponent,
    BreadcrumbAreaComponent,
    FooterComponent,
    PaginationComponent,
    SnackbarComponent,
  ],
  providers: [
    SharedService,
    CategoryService,
    ProductService
  ]
})
export class SharedModule { }
