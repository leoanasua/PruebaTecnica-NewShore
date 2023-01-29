import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Flight } from 'src/app/models/flight.interface';
import { Flights } from 'src/app/models/flights.interface';
import { Journey } from 'src/app/models/journey.interface';
import { FlightsService } from 'src/app/services/flights/flights.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  bookingForm = {} as FormGroup;
  flights: Flights[];
  journey: Journey[];
  foundFlightsOrigin = [];
  foundFlightsDestination = [];
  completeRequest = [];

  constructor(
    private formBuilder: FormBuilder,
    private flightsService: FlightsService
  ) { }

  ngOnInit() {
    this.getBookingForm();
    this.getFlights();
  }

  getBookingForm() {
    this.bookingForm = this.formBuilder.group({
      origin: ['', [Validators.required]],
      destination: ['', [Validators.required]]
    }, { validator: HomeComponent.checkFieldsValue });
  }

  changeValueToUppercase(field: string) {
    const obj = {};
    obj[field] = this.bookingForm.controls[field].value.toUpperCase();
    this.bookingForm.patchValue(obj);
  }

  private static checkFieldsValue(group: FormGroup) {
    const destination = group.get('destination');
    const origin = group.get('origin');

    if (origin.value === destination.value && origin.value !== '') {
      destination?.setErrors({ isSameValue: true })
    }


    /*  destination?.setErrors(
       origin?.value === destination.value ? { isSame: true } : null,
     ); */
  }

  getFlights() {
    this.flightsService.getFlights()
      .subscribe((flights) => {
        this.flights = flights
        console.log(flights, 'flights')
      }, error => {
        console.log(error)
      });
  }

  test(userOrigin: string, userDestination: string) {
    this.flights.forEach((flight: Flights) => {
      if (flight.departureStation === userOrigin) {
        this.foundFlightsOrigin.push(flight);
        console.log(flight, 'this.foundFlightsOrigin')
      }
    });
  }



}
