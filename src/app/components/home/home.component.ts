import { Component, OnInit } from '@angular/core';
import { Weather } from 'src/app/models/weather.model';
import { HomeService } from 'src/app/services/home.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  unit: string;
  isFavourite: boolean;
  homeData: any;

  constructor(
    public homeService: HomeService,
    private storageService: StorageService
  ) {
    this.unit = 'cel';
    this.isFavourite = false;
    this.homeService.homeData.subscribe(
      (response: any) => this.homeData = response
    );
   }

  ngOnInit(): void {
    this.homeService.setHomePageData();
  }

  changeUnit(unit: string): void {
    if (unit !== this.unit) {
      this.unit = unit;
    }
  }

  isFavouriteId(id: number): boolean {
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

  removeFromFavourites(id: number): void {
    this.isFavourite = !this.isFavourite;
  }

}
