import React, { memo } from 'react';
import { getCurrencySymbol } from '../../helpers/currency';
import { DEFAULT_PRECISION } from '../../helpers/global'



const Currency = memo(
  ({
    currency,
    amount,
    precision = DEFAULT_PRECISION,
    qaIdPrefix = 'currency',
  }) => {
    if (isNaN(amount)) return null;
    const currencySymbol = getCurrencySymbol(currency);
    const preciseAmount = amount.toFixed(precision);
    return (
      <span data-testid={`${qaIdPrefix}-amount`}>
        {preciseAmount} {currencySymbol}
      </span>
    );
  },
);

export default Currency;
