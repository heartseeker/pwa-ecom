import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../shared.service';
import { CategoryService } from '../../services/category/category.service';
import { Router } from '../../../../../node_modules/@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CartModel } from './../../models/cart.model';
import { CartState } from '../../../store/states/app.cart';
import { FavoriteState } from '../../../store/states/app.favorite';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as cartActions from './../../../store/actions/cart.actions';
import * as favoriteActions from './../../../store/actions/favorite.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  menu: boolean = false;
  megamenu: boolean = false;
  isMobile: boolean = false;
  cart$: Observable<CartModel>;
  favorite$: Observable<CartModel>;
  activeMenu: string = null;
  allCategories;
  search: string;
  form: FormGroup;

  constructor(
    private cartStore: Store<CartState>,
    private favoriteStore: Store<FavoriteState>,
    private sharedService: SharedService,
    private categoryService: CategoryService,
    private router: Router,
    private fb: FormBuilder,
  ) { }

  async ngOnInit() {
    this.form = this.fb.group({
      search: []
    });


    this.sharedService.isMobile.subscribe(isMobile => this.isMobile = isMobile);


    this.cart$ = this.cartStore.select('cart');
    this.favorite$ = this.favoriteStore.select('favorite');

    // this.favoriteStore.select('favorite').subscribe(favorite => {
    //   console.log('favorite @', favorite);
    // });

    // listen to favorites actions
    // this.sharedService.favorites.subscribe(favorites => {
    //   if (favorites) {
    //     this.favorites = favorites;
    //   }
    // });

    this.allCategories = await this.categoryService.getAllCategory();
    this.sharedService.categories.next(this.allCategories);
    localStorage.setItem('categories', JSON.stringify(this.allCategories));
  }


  async cartToggle(name) {
    if (name === 'cart') {
      return this.cartStore.dispatch(new cartActions.OpenCart());
    }
    this.favoriteStore.dispatch(new favoriteActions.OpenFavorite());
  }

  activateMenu(name) {
    if (this.activeMenu === name) {
      this.activeMenu = null;
    } else {
      this.activeMenu = name;
    }
  }

  redirect(slug) {
    // close menu
    this.menu = !this.menu;
    // check if all
    if (slug.includes('all-')) {
      const s = slug.split('all-');
      return this.router.navigate([`/${s[1]}`]);
    }
    return this.router.navigate([`/${slug}`]);
  }

  find() {
    const search = this.form.get('search').value;
    this.router.navigate([`/search/${search}`]);
  }
}

class Cart {
  status: boolean;
  name: string;
  data: any;
}
