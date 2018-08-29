import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { SharedService } from '../../../shared/shared.service';
import { get, set } from 'idb-keyval';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { CartState } from './../../../store/states/app.cart';
import { FavoriteState } from './../../../store/states/app.favorite';
import * as cartActions from './../../../store/actions/cart.actions';
import * as favoriteActions from './../../../store/actions/favorite.actions';

@Component({
  selector: 'app-widget-product',
  templateUrl: './widget-product.component.html',
  styleUrls: ['./widget-product.component.scss']
})
export class WidgetProductComponent implements OnInit, OnChanges {

  @Input('products') products;
  cart: any = [];
  favorites: any = [];
  snack = false;
  snackbarMessage: string;

  constructor(
    private cartStore: Store<CartState>,
    private favoriteStore: Store<FavoriteState>,
    private sharedService: SharedService,
    private router: Router
  ) { }

  async ngOnChanges(change: SimpleChanges) {
    if (change.products.currentValue) {
      const products = change.products.currentValue;
      products.map((product, index) => {
        const f = this.favorites.findIndex((o) => o.id === product.id);
        if (f >= 0) {
          this.products[index]['favorite'] = true;
        } else {
          this.products[index]['favorite'] = false;
        }
      });
    }
  }

  async ngOnInit() {
    this.initCartFavorite();
  }

  async initCartFavorite() {
    this.cart = await get('cart');
    this.favorites = await get('favorites');
    if (!this.cart) {
      this.cart = [];
    }
    if (!this.favorites) {
      this.favorites = [];
    }
  }

  async listenToCart(name) {
    this.sharedService[name].subscribe(async (data) => {
      if (data) {
        this[name] = await get(name);
        if (!this[name]) {
          return this[name] = [];
        }
      }
    });
  }

  setPrimaryImage(product) {
    if (product.images[0].name === 'Placeholder') {
      return '/assets/img/product-img/noimage.jpg';
    }
    return product.images[0].src;
  }

  setHoverImage(product) {
    if (product.images.length > 1) {
      return product.images[1].src;
    }
    return false;
  }

  redirect(product) {
    this.router.navigate(['/' + product.categories[product.categories.length - 1].slug + '/' + product.slug]);
  }

  async addToCart(product) {
    await this.initCartFavorite();
    this.cart.push(product);
    await set('cart', this.cart);
    this.cartStore.dispatch(new cartActions.AddCart(product));
    this.showSnackBar('Successfully added to cart!');
  }

  async addToFavorite(product) {
    await this.initCartFavorite();
    const favorite = this.checkIfAlreadyFavorite(product);
    if (favorite) {
      this.showSnackBar('Removed from favorites');
      return this.removeFromFavorites(favorite);
    }

    this.favorites.push(product);
    await set('favorites', this.favorites);
    this.favoriteStore.dispatch(new favoriteActions.AddFavorite(product));
    this.products.map((p, index) => {
      const f = this.favorites.findIndex((o) => o.id === p.id);
      if (f >= 0) {
        this.products[index]['favorite'] = true;
      } else {
        this.products[index]['favorite'] = false;
      }
    });
    console.log('this.products', this.products);
    this.showSnackBar('Successfully added to favorites!');
  }

  checkIfAlreadyFavorite(product) {
    const has = this.favorites.findIndex((o) => o.id === product.id);
    if (has >= 0) {
      return has;
    }
    return false;
  }

  async removeFromFavorites(index) {
    this.favorites.splice(index, 1);
    await set('favorites', this.favorites);
    this.favoriteStore.dispatch(new favoriteActions.RemoveCloseFavorite(index));
    this.products.map((p, i) => {
      const f = this.favorites.findIndex((o) => o.id === p.id);
      if (f >= 0) {
        this.products[i]['favorite'] = true;
      } else {
        this.products[i]['favorite'] = false;
      }
    });
  }

  removeFavoriteIcon(p) {
    const index = this.products.findIndex((o) => o.id === p.id);
    this.products[index]['favorite'] = false;
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


class Cart {
  status: boolean;
  name: string;
  data: any;
}
