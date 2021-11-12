import React from 'react';
import Exchange from './Exchange';
import { render } from '../helpers/testHelpers';
import user from '@testing-library/user-event';

describe('Exchange Screen', () => {
  it('can render with redux with defaults', () => {
    const { getByTestId } = render(<Exchange />);

    const sourceInput = getByTestId(/source-exchange-item-input/i);
    const destinationInput = getByTestId(/destination-exchange-item-input/i);
    expect(sourceInput).toHaveAttribute('value', '');
    expect(destinationInput).toHaveAttribute('value', '');
  });

  it('user updates in source and according destination currency value is update with respect to rate', () => {
    const { getByTestId } = render(<Exchange />);

    const sourceInput = getByTestId(/source-exchange-item-input/i);
    const destinationInput = getByTestId(/destination-exchange-item-input/i);
    user.type(sourceInput, '10');
    expect(destinationInput).toHaveAttribute('value', '11.28');
  });

  it('user updates in destination and according source currency value is update with respect to rate', () => {
    const { getByTestId } = render(<Exchange />);

    const sourceInput = getByTestId(/source-exchange-item-input/i);
    const destinationInput = getByTestId(/destination-exchange-item-input/i);
    user.type(destinationInput, '10');
    expect(sourceInput).toHaveAttribute('value', '8.87');
  });

  it('user types a big number in destination currency and accordingly source currency value is updated wrt rate with exceeds balance msg', async () => {
    const { getByTestId } = render(<Exchange />);

    const sourceInput = getByTestId(/source-exchange-item-input/i);
    const destinationInput = getByTestId(/destination-exchange-item-input/i);
    user.type(destinationInput, '10000');
    expect(sourceInput).toHaveAttribute('value', '8868.39');
    const exceedsBalance = getByTestId(/source-exchange-item-exceeds/i);
    expect(exceedsBalance).toHaveTextContent('exceeds balance');
  });

});
