import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../../shared/shared.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-widget-category',
  templateUrl: './widget-category.component.html',
  styleUrls: ['./widget-category.component.scss']
})
export class WidgetCategoryComponent implements OnInit {

  allCategories;

  constructor(
    private router: Router,
    private sharedService: SharedService,
  ) { }

  async ngOnInit() {
    this.sharedService.categories.subscribe((categories) => {
      if (categories) {
        this.allCategories = categories;
        this.allCategories.map((category, index) => {
          this.allCategories[index]['show'] = true;
        });
      }
    });
  }

  collapseMenu(index) {
    this.allCategories[index]['show'] = !this.allCategories[index]['show'];
  }

  redirect(slug) {
    // check if all
    if (slug.includes('all-')) {
      const s = slug.split('all-');
      return this.router.navigate([`/${s[1]}`]);
    }
    return this.router.navigate([`/${slug}`]);
  }

}
