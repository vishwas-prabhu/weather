import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'weather';
  isDrawerOpen = false;

  closeDrawer(data: boolean): void {
    this.isDrawerOpen = data;
  }
}
