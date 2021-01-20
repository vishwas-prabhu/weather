import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss'],
  animations: [
    trigger('openClose', [
      state('open', style({
        left: '0%'
      })),
      state('close', style({
        left: '-70%'
      })),
      transition(':enter', [
        style({ left: '-70%' }),
        animate('0.1s', style({
          left: '0%'
        }))
      ]),
      transition('open => close', [
        animate('0.1s')
      ]),
    ]),
  ],
})
export class DrawerComponent implements OnInit, OnDestroy {

  @Output() closeDrawer: EventEmitter<any> = new EventEmitter<any>();
  isOpen = false;

  constructor() {
  }

  ngOnInit(): void {
    this.isOpen = true;
  }

  close(): void {
    this.isOpen = false;
    setTimeout(() => {
      this.closeDrawer.emit(false);
    }, 100);
  }

  ngOnDestroy(): void {
  }

}
