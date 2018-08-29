import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';

// reducers
import * as cartReducer from '../store/reducers/cart.reducer';
import * as favoriteReducer from '../store/reducers/favorite.reducer';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('cart', cartReducer.reducer),
    StoreModule.forFeature('favorite', favoriteReducer.reducer),
  ],
  declarations: []
})
export class AppStoreModule { }
