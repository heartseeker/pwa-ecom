// Modules
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { SharedModule } from './shared/shared.module';
import { ShopModule } from './shop/shop.module';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';

// Components
import { AppComponent } from './app.component';
import { HomeComponent } from './shop/home/home.component';

// Services
import { ApiService } from './core/api.service';
import { MessagingService } from './core/messaging.service';
import { StoreModule } from '@ngrx/store';

// reducers
import * as cartReducer from './store/reducers/cart.reducer';
import * as favoriteReducer from './store/reducers/favorite.reducer';

// environment
import { environment } from './../environments/environment';


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
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
  ],
  providers: [
    ApiService,
    MessagingService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
