import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { rootReducer } from './reducers';
import { initialState as exchangeInitialState } from './reducers/exchangeRateReducer';
import { initialState as pocketInitialState } from './reducers/pocketReducer';
import { composeWithDevTools } from 'redux-devtools-extension';


const initialState = {
  exchangeRates: exchangeInitialState,
  pockets: pocketInitialState,
};

export const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(
    applyMiddleware(thunkMiddleware),
  ),
);
