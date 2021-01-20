import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { Weather } from '../models/weather.model';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private homeDataSubject = new Subject<any>();
  homeData = this.homeDataSubject.asObservable();

  constructor(
    private http: HttpClient,
  ) {
  }

  setHomePageData(): void {
    this.http.get<any>('https://api.openweathermap.org/data/2.5/weather?q=udupi&appid=fd1aff577261f0d57958b40b645a4145')
    .subscribe(
      (response: any) => {
        this.homeDataSubject.next(response);
      }
    );
  }
}
