import { Component, OnInit } from '@angular/core';
import { FavouritesService } from 'src/app/services/favourites.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.scss']
})
export class FavouritesComponent implements OnInit {

  data: any;
  isDialogOpen: boolean;

  constructor(
    private favouritesService: FavouritesService,
    private storageService: StorageService
  ) {
    this.isDialogOpen = true;
    this.favouritesService.getFavouritesList().subscribe(
      (response: any) => this.data = response
    );
  }

  ngOnInit(): void {
    this.favouritesService.setFavouritesList();
  }

  removeFromFavorites(index: number): void {
    this.storageService.removeFromFavouritesList(this.data[index].id);
    this.data.splice(index, 1);
  }

  clearAll(): void {
    this.data.splice(0, this.data.length);
    this.storageService.removeAllFavourites();
  }

}
