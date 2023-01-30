import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Flight } from 'src/app/models/flight.interface';
import { FlightsResponse } from 'src/app/models/flights-response.interface';
import { Journey } from 'src/app/models/journey.interface';

@Injectable({
  providedIn: 'root'
})

export class FlightsService {
  journeyOrigin: string;
  journeyDestination: string;
  flights: Flight[];
  graph = {};
  journeys: Journey[];
  path = [];
  stops = 0;
  maxStops = 5;

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

  findJourneys(flights: Flight[], origin: string, destination: string, maxStops: number) {
    this.resetProperties();
    this.journeyDestination = destination;
    this.journeyOrigin = origin;
    this.maxStops = maxStops;

    this.createFlightsGraph(flights);
    this.recursiveHasPath(this.graph[origin], destination);
    console.log("journeys", this.journeys)
    return this.journeys;
  }

  createFlightsGraph(flights: Flight[]) {
    for (const flight of flights) {
      this.graph[flight.origin] = this.graph[flight.origin] ?? [];
      this.graph[flight.origin].push(flight);
    }
  }

  recursiveHasPath(originFlight: Flight[], destination: string) {
    if (originFlight) {
      for (const flight of originFlight) {
        this.path[this.stops] = flight;
        if (flight.destination === destination) {
          this.journeys.push(this.createJourney(structuredClone(this.path)));
        } else if (this.stops < this.maxStops) {
          if (!this.path.find(pathFlight => pathFlight.origin == flight.destination)) {
            this.stops++;
            this.recursiveHasPath(this.graph[flight.destination], destination);
            this.stops--;
          }
          this.path.pop();
        };
      }

    }
  }

  createJourney(path: Flight[]): Journey {

    const journey: Journey = {
      flights: path,
      destination: this.journeyDestination,
      origin: this.journeyOrigin,
      price: 0
    }

    for (const flight of journey.flights) {
      journey.price += flight.price;
    }

    return journey;

  }

  resetProperties() {
    this.journeyDestination = '';
    this.journeyOrigin = '';
    this.flights = [];
    this.graph = {};
    this.journeys = [];
    this.path = [];
    this.stops = 0;

  }

}


