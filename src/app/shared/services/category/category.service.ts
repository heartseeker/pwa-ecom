import { Injectable } from '@angular/core';
import { ApiService } from '../../../core/api.service';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {


  constructor(
    private http: ApiService
  ) { }

  getAllCategory() {
    return new Promise((resolve) => {
      // get list of categories
      this.http.get('products/categories?per_page=100').subscribe(categories => {
        const allCategories = this.structureCategories(categories);
        return resolve(allCategories);
      });
    });
  }

  private structureCategories(categories) {
    const mainCat = [];
    let subCat = [];

    // get main categories
    categories.map(category => {
      // check if parent id is 15 (General)
      if (category.parent === 15) {
        mainCat.push(category);
      }
    });

    // get subcategories
    mainCat.map((main, index) => {
      subCat = [];
      categories.map(category => {
        // check if sub category and add
        if (category.parent === main.id) {
          subCat.push(category);
        }
      });
      mainCat[index]['sub_categories'] = subCat;
    });
    return mainCat;
  }
}
