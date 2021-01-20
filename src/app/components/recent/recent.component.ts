import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recent',
  templateUrl: './recent.component.html',
  styleUrls: ['./recent.component.scss']
})
export class RecentComponent implements OnInit {

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
    ];
  }

  clearAll(): void {
    this.data.splice(0, this.data.length);
  }

}
