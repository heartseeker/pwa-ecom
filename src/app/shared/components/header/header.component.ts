import { Component, OnInit, ViewChild } from '@angular/core';
import { SharedService } from '../../shared.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  menu: boolean = false;
  megamenu: boolean = false;
  isMobile: boolean = false;
  cart: boolean = false;
  activeMenu: string = null;

  @ViewChild('classynav') classynav;

  constructor(
    private sharedService: SharedService
  ) { }

  ngOnInit() {
    this.sharedService.isMobile.subscribe(isMobile => this.isMobile = isMobile);
    this.sharedService.cartToggle.subscribe(cart => this.cart = cart);
  }

  cartToggle() {
    this.cart = !this.cart;
    this.sharedService.cartToggle.next(this.cart);
  }

  activateMenu(name) {
    if (this.activeMenu === name) {
      this.activeMenu = null;
    } else {
      this.activeMenu = name;
    }
    console.log('this.activeMenu', this.activeMenu);
    console.log('classy', this.classynav);
  }

}
