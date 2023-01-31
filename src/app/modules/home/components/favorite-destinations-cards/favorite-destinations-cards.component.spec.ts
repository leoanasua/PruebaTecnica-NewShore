import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteDestinationsCardsComponent } from './favorite-destinations-cards.component';

describe('FavoriteDestinationsCardsComponent', () => {
  let component: FavoriteDestinationsCardsComponent;
  let fixture: ComponentFixture<FavoriteDestinationsCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FavoriteDestinationsCardsComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FavoriteDestinationsCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('init var', () => {
    it('should destinationsOptionsCards equal to mock', () => {
      const destinationsOptionsCards = [
        {
          title: 'BOG',
          img: 'assets/img/Bgta.jpg',
        },
        {
          title: 'Madrid',
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
      expect(component.destinationsOptionsCards).toEqual(destinationsOptionsCards);
    });
  });

});