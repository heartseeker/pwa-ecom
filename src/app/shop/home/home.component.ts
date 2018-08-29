import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../shared/services/product/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from '../../shared/shared.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  products;
  currentCategory;
  searchCount;
  isHomePage: boolean = false;

  constructor(
    private sharedService: SharedService,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  async ngOnInit() {
    this.route.params.subscribe(async (params) => {
      const search = params['product'];
      const category = params['category'];

      this.isHomePage = this.router.url === '/' ? true : false;

      // set product default to 0
      this.products = [];

      // if search page
      if (search) {
        this.products = await this.productService.findProducts(search);
        this.currentCategory = {};
        this.currentCategory['count'] = this.products.length;
        return;
      }

      // if home page
      if (!category) {
        return this.products = await this.productService.getFeaturedProducts();
      }

      this.sharedService.categories.subscribe(async(categories) => {
        if (categories) {
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
        }
      });
    });
  }

}
