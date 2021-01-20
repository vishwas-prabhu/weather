import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  setFavouritesList(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  addToFavouritesList(id: number): void {
    if (localStorage.getItem('favList')) {
      const favIdList: any = JSON.parse(localStorage.getItem('favList') || '[]');
      if (favIdList.includes(id)) {
        return;
      }
      favIdList.push(id);
      this.setFavouritesList('favList', favIdList);
    } else {
      this.setFavouritesList('favList', [id]);
    }
  }

  removeFromFavouritesList(id: number): void {
    if (localStorage.getItem('favList')) {
      const favIdList: any = JSON.parse(localStorage.getItem('favList') || '[]');
      favIdList.splice(favIdList.indexOf(favIdList.find((item: any) => item === id)), 1);
      this.setFavouritesList('favList', favIdList);
    }
  }

  getFavouritesList(): string | any {
    if (localStorage.getItem('favList')) {
      const stri = localStorage.getItem('favList');
      return stri?.slice(1, stri.length - 1);
    }
  }

  isFavouriteId(id: number): boolean {
    const favIdList: any = JSON.parse(localStorage.getItem('favList') || '[]');
    if (favIdList) {
      if (favIdList.includes(id)) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  removeAllFavourites(): void {
    localStorage.setItem('favList', '[]');
  }
}
