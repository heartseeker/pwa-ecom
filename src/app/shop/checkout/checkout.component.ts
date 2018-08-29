import { Component, OnInit } from '@angular/core';
import { get } from 'idb-keyval';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  cart;
  total = 0;

  constructor() { }

  async ngOnInit() {
    this.cart = await get('cart');
    if (this.cart && this.cart.length > 0) {
      this.total = this.cart.map(product => Number.parseInt(product.price)).reduce((prev, next) => prev + next);
    }
  }

}
