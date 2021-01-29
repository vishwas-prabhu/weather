import { Component, OnInit, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Weather } from 'src/app/models/weather.model';
import { HomeService } from 'src/app/services/home.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {

  unit: string;
  isFavourite: boolean;
  homeData: any;
  dbEventResult: any;

  constructor(
    public homeService: HomeService,
    private storageService: StorageService,
    private elRef: ElementRef,
    private cookie: CookieService
  ) {
    this.unit = 'cel';
    this.isFavourite = false;
    this.homeService.homeData.subscribe(
      (response: any) => this.homeData = response
    );
  }

  ngOnInit(): void {
    this.createStore();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position: Position) => {
        if (position) {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          this.homeService.setHomePageDataUsingCoordinates(lng, lat);
        }
      },
        (error: PositionError) => this.homeService.setHomePageDataUsingCoordinates(74.75, 13.35)
      );
    } else {
      this.homeService.setHomePageDataUsingCoordinates(74.75, 13.35);
    }
  }

  ngAfterViewInit(): void {
    this.elRef.nativeElement.parentElement.classList.add('remove-padding');
    this.cookie.set('unit', 'vihs', 1);
  }

  createStore(): any {
    const db = indexedDB.open('weather', 1);
    db.onupgradeneeded = (e: any) => {
      const event = e.target.result;
      event.createObjectStore('unitStore', { keyPath: 'key' });
    };
    db.onsuccess = (e: any) => {
      this.dbEventResult = e.target.result;
      this.getUnit();
    };
    db.onerror = (e: any) => {
      console.log('on error');
    };
  }

  getUnit(): any {
    const unitStore = this.dbEventResult.transaction(['unitStore'], 'readonly').objectStore('unitStore').get('unit');
    unitStore.onsuccess = (ev: any) => {
      if (ev.target.result?.value) {
        this.unit = ev.target.result.value;
      }
    };
  }

  changeUnitStore(unit: string): any {
    const unitStore = this.dbEventResult.transaction(['unitStore'], 'readwrite').objectStore('unitStore');
    unitStore.get('unit').onsuccess = (ev: any) => {
      unitStore.put({ key: 'unit', value: unit });
    };
  }

  changeUnit(unit: string): void {
    if (unit !== this.unit) {
      this.unit = unit;
      this.changeUnitStore(unit);
    }
  }

  isFavouriteId(id: number): boolean {
    this.isFavourite = false;
    if (this.storageService.isFavouriteId(id)) {
      this.isFavourite = true;
    }
    return true;
  }

  toggleFavourites(id: number): void {
    this.isFavourite = !this.isFavourite;
    if (this.isFavourite) {
      this.storageService.addToFavouritesList(id);
    } else {
      this.storageService.removeFromFavouritesList(id);
    }
  }

  ngOnDestroy(): void {
    this.elRef.nativeElement.parentElement.classList.remove('remove-padding');
  }

}
