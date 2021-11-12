export const exchangeRatesData = {
  data: {
    rates: { USD: 1.1276, EUR: 1.8957 },
    base: 'EUR'
  },
};

export let pocketTransactionPayload = {
  sourceCurrency: { currency: 'EUR', amount: 8 },
  destinationCurrency: { currency: 'USD', amount: 12.5 },
  rate: 0.797,
};

export const pocketData = {
  data: {
    EUR: 800,
    GBP: 650.03,
    USD: 481.63,
    HUF: 5000.80,
    AZN: 700.45,
    TRY: 0,
  },
};

export const pocketContent = {
  currency: 'EUR',
  amount: 1048,
};

export const error = {
  code: 403,
  message: 'Forbidden',
};

export const completeState = {
  exchangeRates: {
    loading: false,
    error: null,
    data: { ...exchangeRatesData.data.rates, EUR: 1 },
  },
  pockets: {
    loading: false,
    error: null,
    success: null,
    data: pocketData.data,
  },
};
