import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-widget-product',
  templateUrl: './widget-product.component.html',
  styleUrls: ['./widget-product.component.scss']
})
export class WidgetProductComponent implements OnInit {

  @Input('products') products;

  constructor() { }

  ngOnInit() {
  }

}
