import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { Weather } from '../models/weather.model';
import { StorageService } from './storage.service';
import { cityList } from '../models/city-list';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private homeDataSubject = new Subject<any>();
  homeData = this.homeDataSubject.asObservable();
  location: any;
  response: any;

  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) {
  }

  setHomeData(fromSearch: boolean): void {
    this.http.get<any>(`https://api.openweathermap.org/data/2.5/weather?q=${this.location}&appid=fd1aff577261f0d57958b40b645a4145`)
    .subscribe(
      (response: any) => {
        this.response = response;
        if (fromSearch) {
          this.storageService.addToRecentsList(response.id);
        }
        this.homeDataSubject.next(this.response);
      }
    );
  }

  setHomePageData(location: string, fromSearch: boolean): void {
    this.location = location;
    this.setHomeData(fromSearch);
  }

  setHomePageDataUsingCoordinates(long: number, lati: number): void {
    if (!this.location && !this.response) {
      this.http.get<any>(`https://api.openweathermap.org/data/2.5/weather?lat=${lati}&lon=${long}&appid=fd1aff577261f0d57958b40b645a4145`)
      .pipe(
        delay(500)
      )
      .subscribe(
        (response: any) => {
          this.response = response;
          this.homeDataSubject.next(response);
        }
      );
    } else {
      this.homeDataSubject.next(this.response);
    }
  }

  searchResults(term: string): Observable<any> {
    return of(cityList.filter((item: string) => item.toLowerCase().includes(term.toLowerCase())));
  }

}
