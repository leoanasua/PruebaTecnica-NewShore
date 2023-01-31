import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CurrencyService } from 'src/app/services/currency/currency.service';
import { Journey } from 'src/app/shared/models/journey.interface';
import { JourneyDetailsComponent } from '../journey-details/journey-details.component';

@Component({
  selector: 'app-journey-card',
  templateUrl: './journey-card.component.html',
  styleUrls: ['./journey-card.component.css']
})
export class JourneyCardComponent {
  @Input() journeys: Journey[];
  currency: string;
  currencyOptions = ['USD', 'EUR', 'MXN'];

  constructor(
    private dialogRef: MatDialog,
    private currencyService: CurrencyService) { }

  ngOnInit() {
    this.currencyService.currentCurrency = this.currencyOptions[0];
  }

  changeCurrency(value: string) {
    this.currency = value;
    this.currencyService.currentCurrency = value
  }

  openJourneyDetails(journey) {
    this.dialogRef.open(JourneyDetailsComponent, {
      data: journey,
      width: '750px'
    });
  }

}
