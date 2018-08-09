import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../shared.service';

@Component({
  selector: 'app-side-cart-area',
  templateUrl: './side-cart-area.component.html',
  styleUrls: ['./side-cart-area.component.scss']
})
export class SideCartAreaComponent implements OnInit {

  cart: boolean = false;

  constructor(
    private sharedService: SharedService
  ) { }

  ngOnInit() {
    this.sharedService.cartToggle.subscribe(cart => this.cart = cart );
  }

  toggleCart() {
    this.cart = !this.cart;
    this.sharedService.cartToggle.next(this.cart);
  }

}
