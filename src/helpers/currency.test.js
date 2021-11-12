import { getCurrencySymbol } from './currency';

describe('currency utils', () => {
  it('get Currency symbol shows correct currency symbols', () => {
    expect(getCurrencySymbol('GBP')).toEqual('£');

    expect(getCurrencySymbol('USD')).toEqual('$');

    expect(getCurrencySymbol('EUR')).toEqual('€');

    expect(getCurrencySymbol('HUF')).toEqual('Ft');

    expect(getCurrencySymbol('TRY')).toEqual('₺');

    expect(getCurrencySymbol('AZN')).toEqual('₼');

  });
});
