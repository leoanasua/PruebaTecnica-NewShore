import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteDestinationsCardsComponent } from './favorite-destinations-cards.component';

describe('FavoriteDestinationsCardsComponent', () => {
  let component: FavoriteDestinationsCardsComponent;
  let fixture: ComponentFixture<FavoriteDestinationsCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavoriteDestinationsCardsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavoriteDestinationsCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
