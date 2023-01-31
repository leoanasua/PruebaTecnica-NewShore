import { Component } from '@angular/core';

@Component({
  selector: 'app-favorite-destinations-cards',
  templateUrl: './favorite-destinations-cards.component.html',
  styleUrls: ['./favorite-destinations-cards.component.css']
})

export class FavoriteDestinationsCardsComponent {

  destinationsOptionsCards: Array<{ title: string; img: string; }> = [
    {
      title: 'BOG',
      img: 'assets/img/Bgta.jpg',
    },
    {
      title: 'MAD',
      img: 'assets/img/Madrid.jpg'
    },
    {
      title: 'MDE',
      img: 'assets/img/Medellin.jpg'
    },
    {
      title: 'BCN',
      img: 'assets/img/Barcelona.jpg'
    }
  ];

}
