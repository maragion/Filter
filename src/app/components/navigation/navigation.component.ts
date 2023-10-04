import {Component, HostListener} from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent {
  constructor() {
  }


  isOpened: boolean = true;
  width: number = 1200;
  sideNavState = true
  isMobile = false

  ngOnInit() {
    this.onResize(window.innerWidth)
  }

  @HostListener('window:resize', ['$event.target.innerWidth'])

  onResize(width: number) {
    this.isOpened = width >= this.width;
    this.sideNavState = width >= this.width;
    if (width <= 540) {
      this.isMobile = true
    } else this.isMobile = false
  }


}
