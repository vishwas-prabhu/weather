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

  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) { }

  setFavouritesList(type: string): void {
    this.list.splice(0, this.list.length);
    if (type === 'fav' && this.storageService.getFavouritesList() !== '') {
      this.http.get<any>(`https://api.openweathermap.org/data/2.5/group?id=${this.storageService.getFavouritesList()}&appid=fd1aff577261f0d57958b40b645a4145`)
      .subscribe(
        (response: any) => {
          this.list.push(...response.list);
        }
      );
    } else if (type === 'rec' && this.storageService.getRecentList() !== '') {
      this.http.get<any>(`https://api.openweathermap.org/data/2.5/group?id=${this.storageService.getRecentList()}&appid=fd1aff577261f0d57958b40b645a4145`).subscribe(
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
