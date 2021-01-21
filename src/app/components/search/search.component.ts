import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { Observable, of, Subject } from 'rxjs';
import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';
import { HomeService } from 'src/app/services/home.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  animations: [
    trigger('openClose', [
      state('open', style({
        left: '0%'
      })),
      state('close', style({
        left: '100%'
      })),
      transition(':enter', [
        style({ left: '100%' }),
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
export class SearchComponent implements OnInit {

  @Output() closeSearch = new EventEmitter<any>();
  isOpen = false;
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
    private homeService: HomeService,
    private storageService: StorageService
  ) {
  }

  ngOnInit(): void {
    this.isOpen = true;
    this.cities = this.searchTerms.pipe(
      debounceTime(1000),
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
    this.close();
    this.homeService.setHomePageData(location);
  }

  close(): void {
    this.isOpen = false;
    setTimeout(() => {
      this.closeSearch.emit(false);
    }, 100);
  }

  clear(): void {
    this.searchBox.nativeElement.value = '';
    this.search('');
  }
}
