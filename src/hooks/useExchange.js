import { useState } from 'react';
import { EUR, USD, POCKET } from '../redux/constants/currencies';
import { getExchangeAmount } from '../helpers/exchange';


const useExchange = ({ rates }) => {
  const [source, setSource] = useState({
    currency: EUR,
    amount: 0,
  });
  const [destination, setDestination] = useState({
    currency: USD,
    amount: 0,
  });

  const onCurrencyChange = (
    typeToUpdate,
    currency,
  ) => {
    if (typeToUpdate === POCKET.SOURCE) {
      setSource((prevState) => ({ ...prevState, currency }));
      setDestination((prevState) => ({
        ...prevState,
        amount: getExchangeAmount(
          prevState.currency,
          source.amount,
          currency,
          rates,
        ),
      }));
    } else {
      setDestination({
        currency,
        amount: getExchangeAmount(
          currency,
          source.amount,
          source.currency,
          rates,
        ),
      });
    }
  };

  const onAmountChange = (typeToUpdate, amount) => {
    if (typeToUpdate === POCKET.SOURCE) {
      setSource((prevState) => ({ ...prevState, amount }));
      setDestination((prevState) => ({
        ...prevState,
        amount: getExchangeAmount(
          prevState.currency,
          amount,
          source.currency,
          rates,
        ),
      }));
    } else {
      setDestination((prevState) => ({ ...prevState, amount }));
      setSource((prevState) => ({
        ...prevState,
        amount: getExchangeAmount(
          prevState.currency,
          amount,
          destination.currency,
          rates,
        ),
      }));
    }
  };

  const onSwitch = () => {
    let tempSource = { ...source };
    let tempDestination = { ...destination };
    setDestination(tempSource);
    setSource(tempDestination);
  };

  return {
    source,
    setSource,
    setDestination,
    destination,
    onAmountChange,
    onCurrencyChange,
    onSwitch,
  };
};

export { useExchange };
