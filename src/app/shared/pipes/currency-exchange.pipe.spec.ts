import { CurrencyExchangePipe } from './currency-exchange.pipe';

xdescribe('CurrencyExchangePipe', () => {
  it('create an instance', () => {
    const pipe = new CurrencyExchangePipe('');
    expect(pipe).toBeTruthy();
  });
});
