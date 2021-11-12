import React from 'react';
import ExchangeBalance from './ExchangeBalance';
import { render } from '@testing-library/react';
import { GBP, POCKET } from '../../redux/constants/currencies';
import { pocketData } from '../../helpers/data';

describe('<ExchangeItem/>', () => {
  it('renders with ExchangeItem with select currency, balance and entered value', () => {
    const onAmountChange = jest.fn();
    const onCurrencyChange = jest.fn();
    const { getByTestId } = render(
      <ExchangeBalance
        onAmountChange={onAmountChange}
        onCurrencyChange={onCurrencyChange}
        currency={GBP}
        amount={302}
        type={POCKET.SOURCE}
        pocket={pocketData.data}
      />,
    );
    let select = getByTestId(/select/i);
    expect(select).toHaveTextContent('GBP');
    let input = getByTestId(/input/i);
    expect(input).toHaveAttribute('value', '302');
    let balance = getByTestId(/exchange-item-balance/i);
    expect(balance).toHaveTextContent('650.03');
  });

});
