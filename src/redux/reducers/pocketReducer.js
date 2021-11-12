import { actionTypes } from '../constants/actionTypes';

//dev note: in real scenario, the pocket balances could be fetched from backend
export const initialState = {
  data: {
    EUR: 800,
    GBP: 650.03,
    USD: 481.63,
    HUF: 5000.80,
    AZN: 700.45,
    TRY: 0,
  },
  loading: false,
  error: null,
  success: null,
};

const pocketReducer = (
  state = initialState,
  action,
) => {
  switch (action?.type) {
    case actionTypes.EXCHANGE_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
        success: null,
      };
    case actionTypes.EXCHANGE_SUCCESS:
      const { sourceCurrency, destinationCurrency, rate } = action.payload;
      return {
        ...state,
        loading: false,
        data: {
          ...state.data,
          [sourceCurrency.currency]:
            state.data[sourceCurrency.currency] - sourceCurrency.amount,
          [destinationCurrency.currency]:
            state.data[destinationCurrency.currency] +
            sourceCurrency.amount * rate,
        },
        success: true,
      };
    case actionTypes.EXCHANGE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
        data: {},
        success: false,
      };

    default:
      return state;
  }
};

export { pocketReducer };
