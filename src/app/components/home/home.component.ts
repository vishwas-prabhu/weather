import { Component, OnInit, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
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

  constructor(
    public homeService: HomeService,
    private storageService: StorageService,
    private elRef: ElementRef
  ) {
    this.unit = 'cel';
    this.isFavourite = false;
    this.homeService.homeData.subscribe(
      (response: any) => this.homeData = response
    );
  }

  ngOnInit(): void {
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
  }

  changeUnit(unit: string): void {
    if (unit !== this.unit) {
      this.unit = unit;
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
