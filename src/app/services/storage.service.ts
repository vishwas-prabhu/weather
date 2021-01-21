import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  setList(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  addToFavouritesList(id: number): void {
    if (localStorage.getItem('favList')) {
      const favIdList: any = JSON.parse(localStorage.getItem('favList') || '[]');
      if (favIdList.includes(id)) {
        return;
      }
      favIdList.push(id);
      this.setList('favList', favIdList);
    } else {
      this.setList('favList', [id]);
    }
  }

  removeFromFavouritesList(id: number): void {
    if (localStorage.getItem('favList')) {
      const favIdList: any = JSON.parse(localStorage.getItem('favList') || '[]');
      favIdList.splice(favIdList.indexOf(favIdList.find((item: any) => item === id)), 1);
      this.setList('favList', favIdList);
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

  removeAllRecents(): void {
    localStorage.setItem('recList', '[]');
  }

  addToRecentsList(id: number): void {
    if (localStorage.getItem('recList')) {
      const recentList: any = JSON.parse(localStorage.getItem('recList') || '[]');
      if (recentList.includes(id)) {
        return;
      }
      recentList.push(id);
      this.setList('recList', recentList);
    } else {
      this.setList('recList', [id]);
    }
  }

  getRecentList(): string | any {
    if (localStorage.getItem('recList')) {
      const stri = localStorage.getItem('recList');
      return stri?.slice(1, stri.length - 1);
    }
  }

}
