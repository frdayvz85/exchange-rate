import { CURRENCY_SYMBOLS } from '../redux/constants/currencies';

export const getCurrencySymbol = (currency) =>
  CURRENCY_SYMBOLS[currency];
