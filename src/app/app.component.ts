import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
  Allcities = [
    'udupi',
    'bangalore',
    'mysore',
    'kalladka',
    'mangalore'
  ];

  cities!: Observable<any>;
  private searchTerms = new Subject<string>();

  constructor(
    private homeService: HomeService
  ) {
    this.date = Date.now();
  }

  ngOnInit(): void {
    this.cities = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => {
        if (term === '') { return of([]); }
        return of(this.Allcities.filter((item: string) => item.includes(term)));
      }),
    );
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  viewDetailsOfSelectedLocation(location: string): void {
    this.searchBox.nativeElement.value = '';
    this.search('');
    this.homeService.setHomePageData(location);
  }

  closeDrawer(data: boolean): void {
    this.isDrawerOpen = data;
  }

  closeSearchWindow(data: boolean): void {
    this.isMobileSearchOpen = data;
  }
}
