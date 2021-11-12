import axios from 'axios';
import {
  actionBegin,
  actionSuccess,
  actionFailure,
} from './genericActions';
import { actionTypes } from '../constants/actionTypes';
import { BASE_URL } from '../../Api';

export const getExchangeRates = () => async (
  dispatch,
) => {
  dispatch(actionBegin(actionTypes.FETCH_RATES_BEGIN));
  try {
    // const API_KEY = "" 
    const { data } = await axios.get(`${BASE_URL}/latest.json?app_id=${process.env.REACT_APP_API_KEY}&symbols=USD,GBP,EUR,HUF,AZN,TRY`); 
    console.log(data)
    dispatch(actionSuccess(actionTypes.FETCH_RATES_SUCCESS, data?.rates));
  } catch (error) {
    dispatch(actionFailure(actionTypes.FETCH_RATES_FAILURE, error));
  }
};
