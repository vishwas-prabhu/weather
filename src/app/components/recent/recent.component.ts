import { Component, OnInit, OnDestroy, AfterViewInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { FavouritesService } from 'src/app/services/favourites.service';
import { HomeService } from 'src/app/services/home.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-recent',
  templateUrl: './recent.component.html',
  styleUrls: ['./recent.component.scss']
})
export class RecentComponent implements OnInit, OnDestroy, AfterViewInit {

  data: any;
  favList: string;
  navbar: any;
  title: any;

  constructor(
    private favouritesService: FavouritesService,
    private homeService: HomeService,
    private storageService: StorageService,
    private router: Router,
    private elRef: ElementRef
  ) {
    this.favList = '';
    this.favouritesService.getFavouritesList().subscribe(
      (response: any) => this.data = response
    );
  }

  ngOnInit(): void {
    this.favouritesService.setFavouritesList('rec');
    this.favList = this.storageService.getFavouritesList();
    this.navbar = this.elRef.nativeElement.parentElement.parentElement.querySelector('#navbar');
    this.title = this.elRef.nativeElement.parentElement.parentElement.querySelector('#title');
  }

  ngAfterViewInit(): void {
    this.navbar.classList.add('custom-class');
    this.title.innerHTML = 'Recent Search';
  }

  toggleFavourite(index: number): void {
    const id = index.toString();
    if (this.favList.indexOf(id) !== -1) {
      this.favList = this.favList.replace(id, '');
      this.storageService.removeFromFavouritesList(index);
    } else {
      this.storageService.addToFavouritesList(index);
      this.favList = this.favList + id;
    }
  }

  clearAll(): void {
    this.data.splice(0, this.data.length);
    this.storageService.removeAllRecents();
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
