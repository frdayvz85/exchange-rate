import {
    actionBegin,
    actionSuccess,
    actionFailure,
  } from './genericActions';
  import { actionTypes } from '../constants/actionTypes';
  import { toast } from 'react-toastify';
  import { getCurrencySymbol } from '../../helpers/currency';
  
  export const doBalanceTransaction = (
    exchangePayLoad,
  ) => async (dispatch) => {
    dispatch(actionBegin(actionTypes.EXCHANGE_BEGIN));
    try {
      const { sourceCurrency, destinationCurrency } = exchangePayLoad;
      dispatch(actionSuccess(actionTypes.EXCHANGE_SUCCESS, exchangePayLoad));
  
      toast.success(
        `${sourceCurrency.amount} ${getCurrencySymbol(
          sourceCurrency.currency,
        )} converted to ${destinationCurrency.amount}  ${getCurrencySymbol(
          destinationCurrency.currency,
        )} successfuly!`,
        {
          position: toast.POSITION.TOP_CENTER,
        },
      );
    } catch (error) {
      dispatch(actionFailure(actionTypes.EXCHANGE_FAILURE, error));
      toast.error(`Conversion failed!`, {
        hideProgressBar: true,
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };
  