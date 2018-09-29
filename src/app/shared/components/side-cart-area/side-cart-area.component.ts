import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../shared.service';
import { set, get } from 'idb-keyval';
import { Router } from '@angular/router';
import { CartModel } from './../../models/cart.model';
import { Store } from '@ngrx/store';
import { CartState } from './../../../store/states/app.cart';
import { FavoriteState } from './../../../store/states/app.favorite';
import * as cartActions from './../../../store/actions/cart.actions';
import * as favoriteActions from './../../../store/actions/favorite.actions';

@Component({
  selector: 'app-side-cart-area',
  templateUrl: './side-cart-area.component.html',
  styleUrls: ['./side-cart-area.component.scss']
})
export class SideCartAreaComponent implements OnInit {

  cart: CartModel;
  favorites: CartModel;
  current: CartModel;
  total: number;
  icon: string;
  hasInternet: boolean = navigator.onLine;

  snackbarMessage: string;
  snack = false;

  constructor(
    private cartStore: Store<CartState>,
    private favoriteStore: Store<FavoriteState>,
    private sharedService: SharedService,
    private router: Router
  ) { }

  async ngOnInit() {
    this.cartStore.select('cart').subscribe(cart => {
      this.current = cart;
      this.current.name = 'cart';
      this.icon = 'bag.svg';
      if (cart.data.length > 0) {
        this.total = cart.data.map(product => Number.parseInt(product.price)).reduce((prev, next) => prev + next);
      }
    });

    this.favoriteStore.select('favorite').subscribe(favorite => {
      this.current = favorite;
      this.current.name = 'favorite';
      this.icon = 'heart.svg';
      if (favorite.data.length > 0) {
        this.total = favorite.data.map(product => Number.parseInt(product.price)).reduce((prev, next) => prev + next);
      }
    });
  }


  toggleCart(name) {
    if (name === 'cart') {
      return this.cartStore.dispatch(new cartActions.CloseCart);
    }
    return this.favoriteStore.dispatch(new favoriteActions.CloseFavorite);
  }

  async remove(name, i) {
    if (name === 'cart') {
      this.cartStore.dispatch(new cartActions.RemoveCart(i));
      console.log('index >', i);
      console.log('before >', this.current.data);
      // this.current.data.splice(i, 1);
      console.log('after >', this.current.data);
      await set('cart', this.current.data);
      this.showSnackBar('Removed a product from cart');
    } else {
      this.cartStore.dispatch(new favoriteActions.RemoveFavorite(i));
      // this.current.data.splice(i, 1);
      await set('favorites', this.current.data);
      this.showSnackBar('Removed from favorites');
    }
  }

  async checkout() {
    if (!this.hasInternet) {
      return;
    }
    await this.router.navigate(['/checkout']);
    this.cart.status = !this.cart.status;
  }

  async goToProduct(name, product) {
    this.router.navigate(['/' + product.categories[0].slug + '/' + product.slug]);
    this[name].status = !this[name].status;
    this.sharedService[name].next(this[name]);
  }

  setPrimaryImage(product) {
    if (product.images[0].name === 'Placeholder') {
      return '/assets/img/product-img/noimage.jpg';
    }
    return product.images[0].src;
  }

  showSnackBar(message) {
    this.snackbarMessage = message;
    this.snack = true;
    const self = this;
    setTimeout(function() {
      self.snack = false;
    }, 3000);
  }

}
