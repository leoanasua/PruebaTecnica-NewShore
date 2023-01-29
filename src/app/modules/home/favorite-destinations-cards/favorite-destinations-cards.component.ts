import { Component } from '@angular/core';

@Component({
  selector: 'app-favorite-destinations-cards',
  templateUrl: './favorite-destinations-cards.component.html',
  styleUrls: ['./favorite-destinations-cards.component.css']
})
export class FavoriteDestinationsCardsComponent {

  destinationsOptionsCards: Array<{ title: string; img: string; }> = [
    {
      title: 'Buenos Aires',
      img: 'assets/img/Arg.jpg',
    },
    {
      title: 'Madrid',
      img: 'assets/img/Madrid.jpg'
    },
    {
      title: 'Medellín',
      img: 'assets/img/Medellin.jpg'
    },
    {
      title: 'Francia',
      img: 'assets/img/Francia.jpg'
    }
  ];

}
