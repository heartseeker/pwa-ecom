import { Injectable } from '@angular/core';
import { ApiService } from '../../../core/api.service';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private http: ApiService
  ) { }

  getFeaturedProducts() {
    return new Promise((resolve) => {
      this.http.get('products?featured=true&per_page=9').subscribe(products => {
        resolve(products);
      });
    });
  }

  getProductsByCategoryId(id) {
    return new Promise((resolve) => {
      this.http.get(`products?category=${id}&per_page=9`).subscribe(products => {
        resolve(products);
      });
    });
  }

}
