import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Weather } from '../models/weather.model';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class FavouritesService {

  list: Weather[] | any = [];
  timeOut: any;
  listCache = new Map();
  baseUrl = 'https://api.openweathermap.org/data/2.5/';
  apiKey = '&appid=fd1aff577261f0d57958b40b645a4145';
  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) {
  }

  setTimer(): void {
    this.timeOut = setTimeout(() => {
      this.listCache.clear();
    }, 360000);
  }

  setFavouritesList(type: string): void {
    this.list.splice(0, this.list.length);
    if (type === 'fav' && this.storageService.getFavouritesList()) {
      const favList = this.storageService.getFavouritesList();
      const beersFromCache = this.listCache.get(`${favList}`);
      if (beersFromCache) {
        this.list.push(...beersFromCache);
        return;
      }
      this.http.get<any>(`${this.baseUrl}group?id=${favList}${this.apiKey}`)
      .subscribe(
        (response: any) => {
          this.listCache.set(`${favList}`, response.list);
          this.list.push(...response.list);
          clearTimeout(this.timeOut);
          this.setTimer();
        }
      );
    } else if (type === 'rec' && this.storageService.getRecentList()) {
      this.http.get<any>(`${this.baseUrl}group?id=${this.storageService.getRecentList()}${this.apiKey}`).subscribe(
        (response: any) => {
          this.list.push(...response.list);
        }
      );
    }
  }

  getFavouritesList(): Observable<any> {
    return of(this.list);
  }
}
