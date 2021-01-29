import { Component, ElementRef, OnInit, ViewChild, LOCALE_ID, Inject } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';
import { HomeService } from './services/home.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'weather';
  isDrawerOpen = false;
  isMobileSearchOpen = false;
  date: any;
  @ViewChild('searchBox') searchBox!: ElementRef;

  cities!: Observable<any>;
  private searchTerms = new Subject<string>();

  constructor(
    private homeService: HomeService,
    @Inject(LOCALE_ID) protected localeId: string
  ) {
  }

  ngOnInit(): void {
    this.cities = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => {
        if (term === '') { return of([]); }
        return this.homeService.searchResults(term);
      }),
    );
    this.setDate();
  }

  setDate(): void {
    this.date = new Date();
    setTimeout(() => {
      this.date = Date.now();
      setInterval(() => {
        this.date = Date.now();
      }, (60 * 1000));
    }, ( 60 - this.date.getSeconds()) * 1000);
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  viewDetailsOfSelectedLocation(location: string): void {
    this.searchBox.nativeElement.value = '';
    this.search('');
    this.homeService.setHomePageData(location, true);
  }

  closeDrawer(data: boolean): void {
    this.isDrawerOpen = data;
  }

  closeSearchWindow(data: boolean): void {
    this.isMobileSearchOpen = data;
  }
}
