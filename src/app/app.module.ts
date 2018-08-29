// Modules
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { SharedModule } from './shared/shared.module';
import { ShopModule } from './shop/shop.module';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';

// Components
import { AppComponent } from './app.component';
import { HomeComponent } from './shop/home/home.component';

// Services
import { ApiService } from './core/api.service';
import { environment } from '../environments/environment';
import { StoreModule } from '@ngrx/store';

// reducers
import * as cartReducer from './store/reducers/cart.reducer';
import * as favoriteReducer from './store/reducers/favorite.reducer';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: { depth: 1 }
  }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule,
    StoreModule.forRoot({favorite: favoriteReducer.reducer, cart: cartReducer.reducer}),
    RouterModule.forRoot(routes),
    ShopModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    ApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
