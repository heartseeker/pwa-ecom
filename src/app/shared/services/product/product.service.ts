import { Injectable } from '@angular/core';
import { ApiService } from '../../../core/api.service';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private http: ApiService
  ) { }

  findProducts(name) {
    return new Promise((resolve) => {
      this.http.get(`products?search=${name}&per_page=100`).subscribe(products => {
        resolve(products);
      });
    });
  }

  getFeaturedProducts() {
    return new Promise((resolve) => {
      this.http.get('products?featured=true&per_page=9').subscribe(products => {
        resolve(products);
      });
    });
  }

  getProductsByCategoryId(id) {
    return new Promise((resolve) => {
      this.http.get(`products?category=${id}&per_page=9&orderBy=price&order=desc`).subscribe(products => {
        resolve(products);
      });
    });
  }

}
