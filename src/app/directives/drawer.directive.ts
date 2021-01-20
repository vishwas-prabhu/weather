import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appDrawer]'
})
export class DrawerDirective {

  @Output() closeDrawer: EventEmitter<any> = new EventEmitter<any>();

  initialXPosition: number;

  constructor() {
    this.initialXPosition = 0;
  }

  @HostListener('mousedown', ['$event'])
  mouseDown($event: any): void {
    this.initialXPosition = $event.pageX;
  }

  @HostListener('mouseup', ['$event'])
  mouseUp($event: any): void {
    if (this.initialXPosition - $event.pageX >= 100) {
      this.closeDrawer.emit(false);
    }
  }

  @HostListener('touchstart', ['$event'])
  touchStart($event: any): void {
    this.initialXPosition = $event.changedTouches[0].pageX;
  }

  @HostListener('touchend', ['$event'])
  touchEnd($event: any): void {
    if (this.initialXPosition - $event.changedTouches[0].pageX >= 100) {
      this.closeDrawer.emit(false);
    }
  }

}
