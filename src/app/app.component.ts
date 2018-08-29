import { Component, OnInit, HostListener } from '@angular/core';
import { SharedService } from './shared/shared.service';
import { trigger, transition, group, query, style, animate } from '@angular/animations';
import * as cartActions from './store/actions/cart.actions';
import * as favoriteActions from './store/actions/favorite.actions';
import { Store } from '@ngrx/store';
import { CartState } from './store/states/app.cart';
import { FavoriteState } from './store/states/app.favorite';
import { get } from 'idb-keyval';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('routeAnimation', [
        transition('1 => 2, 2 => 3', [
            style({ height: '!' }),
            query(':enter', style({ transform: 'translateX(100%)' })),
            query(':enter, :leave', style({ position: 'absolute', top: 0, left: 0, right: 0 })),
            // animate the leave page away
            group([
                query(':leave', [
                    animate('0.3s cubic-bezier(.35,0,.25,1)', style({ transform: 'translateX(-100%)' })),
                ]),
                // and now reveal the enter
                query(':enter', animate('0.3s cubic-bezier(.35,0,.25,1)', style({ transform: 'translateX(0)' }))),
            ]),
        ]),
        transition('3 => 2, 2 => 1', [
            style({ height: '!' }),
            query(':enter', style({ transform: 'translateX(-100%)' })),
            query(':enter, :leave', style({ position: 'absolute', top: 0, left: 0, right: 0 })),
            // animate the leave page away
            group([
                query(':leave', [
                    animate('0.3s cubic-bezier(.35,0,.25,1)', style({ transform: 'translateX(100%)' })),
                ]),
                // and now reveal the enter
                query(':enter', animate('0.3s cubic-bezier(.35,0,.25,1)', style({ transform: 'translateX(0)' }))),
            ]),
        ]),
    ])
]
})
export class AppComponent implements OnInit {

  constructor(
    private sharedService: SharedService,
    private cartStore: Store<CartState>,
    private favoriteStore: Store<FavoriteState>,
  ) {}

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.sharedService.isMobile.next(this.isMobile());
  }

  async ngOnInit() {
    this.sharedService.isMobile.next(this.isMobile());
    const initCart = await get('cart');
    initCart['map'](cart => {
      this.cartStore.dispatch(new cartActions.AddCart(cart));
    });

    const initFavorite = await get('favorites');
    initFavorite['map'](favorite => {
      this.favoriteStore.dispatch(new favoriteActions.AddFavorite(favorite));
    });
  }

  isMobile() {
    const isMobile = window.matchMedia('only screen and (max-width: 760px)');
    if (isMobile.matches) {
      return true;
    }
    return false;
  }

  getDepth(outlet) {
    return outlet.activatedRouteData['depth'];
  }

}
