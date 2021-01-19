import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.scss']
})
export class FavouritesComponent implements OnInit {

  data: any;

  constructor() { }

  ngOnInit(): void {
    this.data = [
      {
        place: 'Udupi, Karnataka',
        temp: '87',
        desc: 'Mostly cloudy',
        favourite: true
      },
      {
        place: 'Udupi, Karnataka',
        temp: '87',
        desc: 'Mostly cloudy',
        favourite: true
      },
      {
        place: 'Udupi, Karnataka',
        temp: '87',
        desc: 'Mostly cloudy',
        favourite: true
      },
      {
        place: 'Udupi, Karnataka',
        temp: '87',
        desc: 'Mostly cloudy',
        favourite: true
      },
      {
        place: 'Udupi, Karnataka',
        temp: '87',
        desc: 'Mostly cloudy',
        favourite: true
      },
    ]
  }

}
