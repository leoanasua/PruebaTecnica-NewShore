import { Pipe, PipeTransform } from '@angular/core';
import { CurrencyService } from 'src/app/services/currency/currency.service';

@Pipe({
  name: 'currencyExchange'
})
export class CurrencyExchangePipe implements PipeTransform {

  constructor(private currencyService: CurrencyService) { }

  transform(price: number, currency: string): any {
    return this.currencyService.convertCurrency(price);
  }

}
