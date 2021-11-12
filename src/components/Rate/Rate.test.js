import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Rate from './Rate';


describe('<Rate/>', () => {
  it('renders LiveRate with from and to currency with currency signs', () => {
    const { getByTestId } = render(
      <Rate
        toCurrency={'USD'}
        fromCurrency={'EUR'}
        conversionRate={1.03}
      />,
    );
    let fromCurrency = getByTestId(/from-currency/i);
    expect(fromCurrency).toHaveTextContent('1 €');
    let toCurrency = getByTestId(/to-currency/i);
    expect(toCurrency).toHaveTextContent('1.0300 $');
  });
});
