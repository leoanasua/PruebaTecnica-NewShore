import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Flight } from 'src/app/shared/models/flight.interface';
import { FlightsResponse } from 'src/app/shared/models/flights-response.interface';
import { Journey } from 'src/app/shared/models/journey.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class FlightsService {

  flights: Flight[];
  graph = {};
  oneWayJourneys: Journey[];
  roundTripJourneys: Journey[];
  path = [];
  stops = 0;

  constructor(private httpClient: HttpClient) { }

  getFlights(): Observable<Flight[]> {
    const url = `${environment.apiUrl}/flights/2`;
    return this.httpClient.get<FlightsResponse[]>(url)
      .pipe(map((flightsReponse) => {
        return this.mapFlights(flightsReponse);
      }))
  }

  mapFlights(flightsReponse: FlightsResponse[]) {
    let flights: Flight[] = [];
    for (let flightResponse of flightsReponse) {

      const transport = {
        flightCarrier: flightResponse.flightCarrier,
        flightNumber: flightResponse.flightNumber
      }

      const flight = {
        destination: flightResponse.departureStation,
        origin: flightResponse.arrivalStation,
        price: flightResponse.price,
        transport: transport
      }
      flights.push(flight);
    }
    return flights;
  }

  findJourneys(flights: Flight[], origin: string, destination: string, maxStops: number, isRoundTrip: boolean) {
    this.resetProperties();
    this.createFlightsGraph(flights);
    this.recursiveHasPath(this.graph[origin], origin, destination, maxStops, this.oneWayJourneys);

    if (isRoundTrip) {
      this.path = [];
      this.recursiveHasPath(this.graph[destination], destination, origin, maxStops, this.roundTripJourneys);
    }

    return this.oneWayJourneys;
  }

  createFlightsGraph(flights: Flight[]) {
    for (const flight of flights) {
      this.graph[flight.origin] = this.graph[flight.origin] ?? [];
      this.graph[flight.origin].push(flight);
    }
  }

  recursiveHasPath(flights: Flight[], origin: string, destination: string, maxStops: number, journeys: Journey[]) {
    if (flights) {
      for (const flight of flights) {
        this.path[this.stops] = flight;
        if (flight.destination === destination) {
          journeys.push(this.createJourney(structuredClone(this.path), origin, destination));
        } else if (this.stops < maxStops) {
          if (!this.path.find(pathFlight => pathFlight.origin == flight.destination)) {
            this.stops++;
            this.recursiveHasPath(this.graph[flight.destination], origin, destination, maxStops, journeys);
            this.stops--;
          }
          this.path.pop();
        };
      }
    }
  }

  createJourney(path: Flight[], journeyOrigin: string, journeyDestination: string): Journey {

    const journey: Journey = {
      flights: path,
      destination: journeyDestination,
      origin: journeyOrigin,
      price: 0
    }

    for (const flight of journey.flights) {
      journey.price += flight.price;
    }

    return journey;
  }

  resetProperties() {
    this.flights = [];
    this.graph = {};
    this.oneWayJourneys = [];
    this.roundTripJourneys = [];
    this.path = [];
    this.stops = 0;
  }
}


