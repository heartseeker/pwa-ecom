import { Injectable } from '@angular/core';
import { BehaviorSubject } from '../../../node_modules/rxjs';
import { CartModel } from './models/cart.model';


@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }

  isMobile = new BehaviorSubject<boolean>(null);
  cart = new BehaviorSubject<CartModel>(null);
  favorites = new BehaviorSubject<CartModel>(null);
  categories = new BehaviorSubject<any>(null);
}
