import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Weather } from '../models/weather.model';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class FavouritesService {

  favouritesList: Weather[] | any = [];

  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) { }

  setFavouritesList(): void {
    this.favouritesList.splice(0, this.favouritesList.length);
    this.http.get<any>(`https://api.openweathermap.org/data/2.5/group?id=${this.storageService.getFavouritesList()}&appid=fd1aff577261f0d57958b40b645a4145`)
    .subscribe(
      (response: any) => {
        this.favouritesList.push(...response.list);
      }
    );
  }

  getFavouritesList(): Observable<any> {
    return of(this.favouritesList);
  }
}
