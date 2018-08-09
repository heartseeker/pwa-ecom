import { Component, OnInit, HostListener } from '@angular/core';
import { SharedService } from './shared/shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  constructor(
    private sharedService: SharedService
  ) {}

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.sharedService.isMobile.next(this.isMobile());
  }

  ngOnInit() {
    this.sharedService.isMobile.next(this.isMobile());
  }

  isMobile() {
    const isMobile = window.matchMedia('only screen and (max-width: 760px)');
    if (isMobile.matches) {
      return true;
    }
    return false;
  }

}
