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
  flightsGraph = {};
  oneWayJourneys: Journey[];
  roundTripJourneys: Journey[];
  journeyPath = [];
  journeyStops = 0;

  constructor(private httpClient: HttpClient) { }

  getFlights(): Observable<Flight[]> {
    const storageFlights = JSON.parse(localStorage.getItem("flights"));
    if (storageFlights) {
      return new Observable(observer => {
        observer.next(storageFlights);
        observer.complete();
      })
    } else {
      return this.requestFlights();
    }
  }

  requestFlights(): Observable<Flight[]> {
    const url = `${environment.apiUrl}/flights/2`;
    return this.httpClient.get<FlightsResponse[]>(url)
      .pipe(map((flightsReponse) => {
        return this.mapFlights(flightsReponse);
      }))
  }

  private mapFlights(flightsReponse: FlightsResponse[]) {
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
    localStorage.setItem("flights", JSON.stringify(flights));
    return flights;
  }

  findJourneys(flights: Flight[], origin: string, destination: string, maxStops: number, isRoundTrip: boolean) {
    this.clearProperties();
    this.createFlightsGraph(flights);
    this.recursiveFindJourneysPath(this.flightsGraph[origin], origin, destination, maxStops, this.oneWayJourneys);

    if (isRoundTrip) {
      this.journeyPath = [];
      this.recursiveFindJourneysPath(this.flightsGraph[destination], destination, origin, maxStops, this.roundTripJourneys);
    }

    return this.oneWayJourneys;
  }

  private createFlightsGraph(flights: Flight[]) {
    for (const flight of flights) {
      this.flightsGraph[flight.origin] = this.flightsGraph[flight.origin] ?? [];
      this.flightsGraph[flight.origin].push(flight);
    }
  }

  private recursiveFindJourneysPath(flights: Flight[], origin: string, destination: string, maxStops: number, journeys: Journey[]) {
    if (flights) {
      for (const flight of flights) {
        this.journeyPath[this.journeyStops] = flight;
        if (flight.destination === destination) {
          journeys.push(this.createJourney(structuredClone(this.journeyPath), origin, destination));
        } else if (this.journeyStops < maxStops) {
          if (!this.journeyPath.find(pathFlight => pathFlight.origin == flight.destination)) {
            this.journeyStops++;
            this.recursiveFindJourneysPath(this.flightsGraph[flight.destination], origin, destination, maxStops, journeys);
            this.journeyStops--;
          }
          this.journeyPath.pop();
        };
      }
    }
  }

  private createJourney(path: Flight[], journeyOrigin: string, journeyDestination: string): Journey {

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

  private clearProperties() {
    this.flights = [];
    this.flightsGraph = {};
    this.oneWayJourneys = [];
    this.roundTripJourneys = [];
    this.journeyPath = [];
    this.journeyStops = 0;
  }
}
