import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FavouritesService } from 'src/app/services/favourites.service';
import { HomeService } from 'src/app/services/home.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.scss']
})
export class FavouritesComponent implements OnInit, AfterViewInit, OnDestroy {

  data: any;
  isDialogOpen: boolean;
  navbar: any;
  title: any;

  constructor(
    private favouritesService: FavouritesService,
    private homeService: HomeService,
    private storageService: StorageService,
    private router: Router,
    private elRef: ElementRef
  ) {
    this.isDialogOpen = false;
    this.favouritesService.getFavouritesList().subscribe(
      (response: any) => this.data = response
    );
  }

  ngOnInit(): void {
    this.favouritesService.setFavouritesList('fav');
    this.navbar = this.elRef.nativeElement.parentElement.parentElement.querySelector('#navbar');
    this.title = this.elRef.nativeElement.parentElement.parentElement.querySelector('#title');
  }

  ngAfterViewInit(): void {
    this.navbar.classList.add('custom-class');
    this.title.innerHTML = 'Favourites';
  }

  removeFromFavorites(index: number): void {
    this.storageService.removeFromFavouritesList(this.data[index].id);
    this.data.splice(index, 1);
  }

  clearAll(): void {
    this.data.splice(0, this.data.length);
    this.storageService.removeAllFavourites();
  }

  navigate(name: string): void {
    this.homeService.setHomePageData(name);
    this.router.navigate(['home']);
  }

  ngOnDestroy(): void {
    this.title.innerHTML = '';
    this.navbar.classList.remove('custom-class');
  }

}
