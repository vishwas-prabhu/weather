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
  parentElement: any;

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
    this.parentElement = this.elRef.nativeElement.parentElement.parentElement;
    this.navbar = this.parentElement.querySelector('#navbar');
    this.title = this.parentElement.querySelector('#title');
  }

  ngAfterViewInit(): void {
    this.navbar.classList.add('custom-class');
    this.parentElement.classList.add('main-class');
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
    this.homeService.setHomePageData(name, false);
    this.router.navigate(['home']);
  }

  ngOnDestroy(): void {
    this.title.innerHTML = '';
    this.navbar.classList.remove('custom-class');
    this.parentElement.classList.remove('main-class');
  }

}
