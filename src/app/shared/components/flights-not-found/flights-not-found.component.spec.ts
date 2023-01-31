import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightsNotFoundComponent } from './flights-not-found.component';

describe('FlightsNotFoundComponent', () => {
  let component: FlightsNotFoundComponent;
  let fixture: ComponentFixture<FlightsNotFoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlightsNotFoundComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlightsNotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
