// modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ContactComponent } from './contact/contact.component';
import { Routes, RouterModule } from '@angular/router';

// components
import { WidgetCategoryComponent } from './home/widget-category/widget-category.component';
import { WidgetFilterComponent } from './home/widget-filter/widget-filter.component';
import { WidgetProductComponent } from './home/widget-product/widget-product.component';
import { CategoryComponent } from './category/category.component';
import { HomeComponent } from './home/home.component';
import { DetailComponent } from './detail/detail.component';
import { CheckoutComponent } from './checkout/checkout.component';


const routes: Routes = [
  {
    path: 'checkout',
    component: CheckoutComponent,
    data: { depth: 2 },
  },
  {
    path: 'contact',
    component: ContactComponent,
    data: { depth: 2 },
  },
  {
    path: 'search/:product',
    component: HomeComponent,
    data: { depth: 2 },
  },
  {
    path: ':category/:product',
    component: DetailComponent,
    data: { depth: 2 },
  },
  {
    path: ':category',
    component: HomeComponent,
    data: { depth: 2 },
  },
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    WidgetCategoryComponent,
    WidgetFilterComponent,
    WidgetProductComponent
  ],
  declarations: [
    ContactComponent,
    WidgetCategoryComponent,
    WidgetFilterComponent,
    WidgetProductComponent,
    CategoryComponent,
    DetailComponent,
    CheckoutComponent
  ]
})
export class ShopModule { }
