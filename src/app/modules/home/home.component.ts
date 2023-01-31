import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Flight } from 'src/app/shared/models/flight.interface';
import { CurrencyService } from 'src/app/services/currency/currency.service';
import { FlightsService } from 'src/app/services/flights/flights.service';
import { ErrorModalComponent } from 'src/app/shared/components/error-modal/error-modal.component';
import { FlightsNotFoundComponent } from 'src/app/shared/components/flights-not-found/flights-not-found.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  bookingForm = {} as FormGroup;
  loading = false;
  containerFlightsOptions = [
    {
      Value: 'RoundTrip',
      ViewValue: 'Ida y vuelta'
    },
    {
      Value: 'OneWay',
      ViewValue: 'Solo ida'
    }
  ];

  constructor(
    private formBuilder: FormBuilder,
    public flightsService: FlightsService,
    private dialogRef: MatDialog,
    private router: Router,
    private currencyService: CurrencyService
  ) { }

  ngOnInit() {
    this.getActualCurrency();
    this.getBookingForm();
  }

  private getActualCurrency() {
    this.currencyService.getCurrentcyActualValues().subscribe({
      next: (_) => { },
      error: (error) => {
        this.loading = false;
        this.dialogRef.open(ErrorModalComponent, {
          data: {
            Mensaje: error.message,
            message: error.messageDetail
          }
        });
      }
    });
  }

  private getBookingForm() {
    this.bookingForm = this.formBuilder.group({
      typeOfFlight: [this.containerFlightsOptions[0].Value],
      origin: ['', [Validators.required, Validators.minLength(3)]],
      destination: ['', [Validators.required, Validators.minLength(3)]],
      stops: [3]
    }, { validator: HomeComponent.checkFieldsValue });
  }

  private static checkFieldsValue(group: FormGroup) {
    const destination = group.get('destination');
    const origin = group.get('origin');
    return origin?.value === destination.value ? { isSameValue: true } : null
  }

  changeValueToUppercase(field: string) {
    const obj = {};
    obj[field] = this.bookingForm.controls[field].value.toUpperCase();
    this.bookingForm.patchValue(obj);
  }

  changeTypeOfFlight(value: string) {
    this.bookingForm.controls['typeOfFlight'].setValue(value);
  }

  getFlights() {
    const isroundTrip = this.bookingForm.controls['typeOfFlight'].value !== 'OneWay';
    const userOrgin = this.bookingForm.controls['origin'].value;
    const userDestionation = this.bookingForm.controls['destination'].value;
    const userStops = this.bookingForm.controls['stops'].value;
    this.loading = true;

    this.flightsService.getFlights()
      .subscribe({
        next: (flights) => {
          this.flightsService.findJourneys(flights, userOrgin, userDestionation, userStops, isroundTrip)
          const isEmptyJourneys = isroundTrip ? !this.flightsService.oneWayJourneys.length
            && !this.flightsService.roundTripJourneys.length :
            !this.flightsService.oneWayJourneys.length;
          isEmptyJourneys ? this.openFlightsNotFound() : this.router.navigate(['flights-list']);
          this.loading = false;
        },
        error: (error) => {
          this.loading = false;
          this.dialogRef.open(ErrorModalComponent, {
            data: {
              Mensaje: error.message,
              message: error.messageDetail
            }
          });
        }
      });
  }

  validateIsTheSameValue(): boolean {
    return this.bookingForm.hasError('isSameValue');
  }

  openFlightsNotFound() {
    this.dialogRef.open(FlightsNotFoundComponent);
  }

}