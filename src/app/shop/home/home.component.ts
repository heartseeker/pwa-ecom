import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../shared/services/product/product.service';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from '../../shared/shared.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  products;
  currentCategory;

  constructor(
    private sharedService: SharedService,
    private productService: ProductService,
    private route: ActivatedRoute
  ) { }

  async ngOnInit() {
    this.route.params.subscribe(async (params) => {
      const category = params['category'];
      // set product default to 0
      this.products = [];
      // if home page
      if (!category) {
        return this.products = await this.productService.getFeaturedProducts();
      }

      // check if main category
      // const categories = JSON.parse(localStorage.getItem('categories'));

      this.sharedService.categories.subscribe(async(categories) => {
        for (let i = 0; i < categories.length; i++) {
          // check if main category
          if (categories[i].slug === category) {
            this.currentCategory = categories[i];
            this.products = await this.productService.getProductsByCategoryId(categories[i].id);
            break;
          } else {
            // check if sub category
            for (let x = 0; x < categories[i].sub_categories.length; x++) {
              const subCategory = categories[i].sub_categories[x];
              if (subCategory.slug === category) {
                this.currentCategory = subCategory;
                this.products = await this.productService.getProductsByCategoryId(subCategory.id);
                break;
              }
            }
          }
        }
      });
    });
  }

}
