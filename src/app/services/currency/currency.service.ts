import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Currency } from 'src/app/shared/models/currency.interface';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  timeToRequest = 3600000;
  currencyApiUrl = 'https://api.freecurrencyapi.com/v1/latest?apikey=';
  apiKey = 'Q3ScKbRxthUeevUOEQrszgn7EG9hrXDjNlv5u4mR';
  data: Currency;
  currentCurrency: string;

  constructor(private httpClient: HttpClient) { }

  getCurrencyValues(): Observable<any> {
    const storageCurrency = JSON.parse(localStorage.getItem("currency"));
    const storageCurrencyDate = JSON.parse(localStorage.getItem("currency.date"));
    const lastRequestTime = Math.abs(new Date().getTime() - storageCurrencyDate);
    if (storageCurrency && lastRequestTime < this.timeToRequest) {
      this.data = storageCurrency;
      return new Observable(observer => {
        observer.next(storageCurrency)
        observer.complete()
      })
    } else {
      return this.requestCurrentcyActualValues();
    }
  }

  requestCurrentcyActualValues(): Observable<any> {
    const url = this.currencyApiUrl + this.apiKey;
    return this.httpClient.get<any>(url)
      .pipe(map((response) => {
        localStorage.setItem("currency.date", JSON.stringify(new Date().getTime()));
        localStorage.setItem("currency", JSON.stringify(response.data));
        return this.data = response.data;
      }))
  }

  convertCurrency(price: number) {
    return price * this.data[this.currentCurrency];
  }

}
