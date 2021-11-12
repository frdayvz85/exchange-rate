export const calculateExchangeRate = (
  fromCurrency,
  toCurrency,
  exchangeRates,
) => {
  const fromRate = exchangeRates[fromCurrency];
  const toRate = exchangeRates[toCurrency];
  if (!fromRate || !toRate) return -1;
  return toRate / fromRate;
};

export const getExchangeAmount = (
  toCurrency,
  amount,
  fromCurrency,
  exchangeRates,
) => {
  let rate = calculateExchangeRate(fromCurrency, toCurrency, exchangeRates);
  return Number((amount * rate).toFixed(2));
};

export const isValidPocketConversion = (
  source,
  destination,
  pockets,
  exchangeRates,
) => {
  if (!source.amount) return false;
  if (source.currency === destination.currency) return false;
  if (!exchangeRates[source.currency] || !exchangeRates[destination.currency])
    return false;
  return source.amount <= pockets[source.currency];
};