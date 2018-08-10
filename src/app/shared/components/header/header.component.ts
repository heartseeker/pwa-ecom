import { Component, OnInit, ViewChild } from '@angular/core';
import { SharedService } from '../../shared.service';
import { ApiService } from '../../../core/api.service';
import { CategoryService } from '../../services/category/category.service';

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
  allCategories;

  @ViewChild('classynav') classynav;

  constructor(
    private sharedService: SharedService,
    private http: ApiService,
    private categoryService: CategoryService
  ) { }

  async ngOnInit() {
    this.sharedService.isMobile.subscribe(isMobile => this.isMobile = isMobile);
    this.sharedService.cartToggle.subscribe(cart => this.cart = cart);

    this.allCategories = await this.categoryService.getAllCategory();
    this.sharedService.categories.next(this.allCategories);
    localStorage.setItem('categories', JSON.stringify(this.allCategories));
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

  }
}
