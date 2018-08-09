import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactComponent } from './contact/contact.component';
import { Routes, RouterModule } from '@angular/router';
import { WidgetCategoryComponent } from './home/widget-category/widget-category.component';
import { WidgetFilterComponent } from './home/widget-filter/widget-filter.component';
import { WidgetProductComponent } from './home/widget-product/widget-product.component';

const routes: Routes = [{
  path: 'contact',
  component: ContactComponent
}];

@NgModule({
  imports: [
    CommonModule,
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
    WidgetProductComponent
  ]
})
export class ShopModule { }
