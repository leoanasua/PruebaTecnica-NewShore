import { CurrencyExchangePipe } from './currency-exchange.pipe';

describe('CurrencyExchangePipe', () => {
  it('create an instance', () => {
    const pipe = new CurrencyExchangePipe(null);
    expect(pipe).toBeTruthy();
  });
});
