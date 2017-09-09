import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-cards',
  templateUrl: 'home.html'
})
export class HomePage {
  cardItems: any[];

  constructor(public navCtrl: NavController) {
    this.cardItems = [
      {
        city: {
          name: 'Ciudad de México',
          temp: '23°'
        },
        image: 'day-sunny'
      },
      {
        city: {
          name: 'Pachuca de Soto',
          temp: '18°'
        },
        image: 'day-rain'
      },
      {
        city: {
          name: 'Guadalajara',
          temp: '19°'
        },
        image: 'day-sleet'
      },
      {
        city: {
          name: 'Aguascalientes',
          temp: '10°'
        },
        image: 'day-snow-wind'
      },
      {
        city: {
          name: 'Oaxaca',
          temp: '11°'
        },
        image: 'day-thunderstorm'
      },
      {
        city: {
          name: 'Monterrey',
          temp: '25°'
        },
        image: 'day-cloudy-high'
      },
      {
        city: {
          name: 'Cancún',
          temp: '23°'
        },
        image: 'day-cloudy'
      },
    ];

  }
}
