import { Injectable } from '@angular/core';
import { BehaviorSubject } from '../../../node_modules/rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }

  isMobile = new BehaviorSubject<boolean>(null);
  cartToggle = new BehaviorSubject<boolean>(null);
  categories = new BehaviorSubject<any>(null);

}
