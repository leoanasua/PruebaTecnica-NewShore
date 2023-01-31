import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FlightsService } from 'src/app/services/flights/flights.service';
import { Journey } from 'src/app/shared/models/journey.interface';

@Component({
  selector: 'app-flights-list',
  templateUrl: './flights-list.component.html',
  styleUrls: ['./flights-list.component.css']
})
export class FlightsListComponent {

  oneWayJourneys: Journey[];
  roundTripJourneys: Journey[];

  constructor(
    private flightsService: FlightsService,
    private router: Router) { }


  ngOnInit() {
    this.roundTripJourneys = this.flightsService.roundTripJourneys;
    this.oneWayJourneys = this.flightsService.oneWayJourneys;
  }

  returnToHome() {
    this.router.navigate(['home']);
  }

}