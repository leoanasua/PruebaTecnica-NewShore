import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Flights } from 'src/app/models/flights.interface';

@Injectable({
  providedIn: 'root'
})

export class FlightsService {

  constructor(private httpClient: HttpClient) { }

  getFlights(): Observable<Array<Flights>> {
    const url = 'https://recruiting-api.newshore.es/api/flights/2';
    return this.httpClient.get<Array<Flights>>(url);
  }

}
