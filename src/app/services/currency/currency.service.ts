import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Currency } from 'src/app/shared/models/currency.interface';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  currencyApiUrl = 'https://api.freecurrencyapi.com/v1/latest?apikey=Q3ScKbRxthUeevUOEQrszgn7EG9hrXDjNlv5u4mR'
  data: Currency;
  currentCurrency: string;

  constructor(private httpClient: HttpClient) { }

  getCurrentcyActualValues(): Observable<any> {
    const url = this.currencyApiUrl;
    return this.httpClient.get<any>(url)
      .pipe(map((response) => {
        return this.data = response.data;
      }))
  }

  convertCurrency(price: number) {
    return price * this.data[this.currentCurrency];
  }

}
