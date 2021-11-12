import React from 'react';
import { applyMiddleware, createStore } from 'redux';
import { rootReducer } from '../redux/reducers';
import thunkMiddleware from 'redux-thunk';
import { Provider } from 'react-redux';
import { render as rtlRender } from '@testing-library/react';
import { completeState } from './data';


const sendInitialState = (
  reducerName,
  initialState,
) => {
  let newState = { ...completeState };
  newState[reducerName] = initialState;
  return newState;
};

const render = (
  ui,
  initialState = completeState,
  options = {},
) => {
  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunkMiddleware),
  );
  const Providers = ({ children }) => (
    <Provider store={store}>{children}</Provider>
  );
  return rtlRender(ui, { wrapper: Providers, ...options }, store);
};

export { sendInitialState, render };