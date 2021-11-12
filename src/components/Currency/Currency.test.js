import React from 'react';
import Currency  from './Currency';
import { render } from '@testing-library/react';

describe('<Currency/>', () => {
  it('renders with currency with symbol', () => {
    const { getByTestId } = render(<Currency currency={'USD'} amount={2000} />);
    const loaderContainer = getByTestId(/currency-amount/i);
    expect(loaderContainer).toHaveTextContent('2000.00 $');
  });

  it('renders with currency with symbol with default precision', () => {
    const { getByTestId } = render(
      <Currency currency={'USD'} amount={6545.326} />,
    );
    const loaderContainer = getByTestId(/currency-amount/i);
    expect(loaderContainer).toHaveTextContent('6545.33 $');
  });

  it('renders with currency with symbol with custom precision', () => {
    const { getByTestId } = render(
      <Currency currency={'USD'} amount={6545.32639} precision={4} />,
    );
    const loaderContainer = getByTestId(/currency-amount/i);
    expect(loaderContainer).toHaveTextContent('6545.3264 $');
  });
});
