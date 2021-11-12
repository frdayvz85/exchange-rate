import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import Layout from "../components/Layout/Layout";
import Rate from "../components/Rate/Rate";
import { POCKET } from "../redux/constants/currencies";
import Button from "../components/Button/Button";
import ExchangeBalance from "../components/ExchangeBalance/ExchangeBalance";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { getExchangeRates } from "../redux/actions/exchangeRateAction";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  calculateExchangeRate,
  isValidPocketConversion,
} from "../helpers/exchange";
import { doBalanceTransaction } from "../redux/actions/balanceTransactionAction";
import { useExchange } from "../hooks/useExchange";
import { FaExchangeAlt } from "react-icons/fa";

const EXCHANGE_RATE_UPDATION_INTERVAL = 10000;

const Exchange = () => {
  const dispatch = useDispatch();

  const [isPerformingConversion, setIsPerformingConversion] = useState(false);

  const { exchangeRates, pockets } = useSelector(
    (state) => ({
      exchangeRates: state.exchangeRates,
      pockets: state.pockets,
    }),
    shallowEqual
  );

  let rates = exchangeRates?.data;


  const {
    source,
    setSource,
    setDestination,
    destination,
    onAmountChange,
    onCurrencyChange,
    onSwitch,
  } = useExchange({ rates });

  const exchangeRate = calculateExchangeRate(
    source.currency,
    destination.currency,
    rates
  );

  const currencyPockets = pockets?.data;
  const pocketConversionSuccess = pockets?.success;
  //fetching the live rates every EXCHANGE_RATE_UPDATION_INTERVAL interval
  useEffect(() => {
    dispatch(getExchangeRates());

    const intervalId = setInterval(() => {
      dispatch(getExchangeRates());
    }, EXCHANGE_RATE_UPDATION_INTERVAL);

    return () => {
      clearInterval(intervalId);
    };
  }, [dispatch]);

  useEffect(() => {
    if (pocketConversionSuccess && isPerformingConversion) {
      setIsPerformingConversion(false);
      setSource((prevState) => ({ ...prevState, amount: 0 }));
      setDestination((prevState) => ({ ...prevState, amount: 0 }));
    }
  }, [
    pocketConversionSuccess,
    setIsPerformingConversion,
    setSource,
    setDestination,
    isPerformingConversion,
  ]);

  const performExchange = (event) => {
    event.preventDefault();
    setIsPerformingConversion(true);
    dispatch(
      doBalanceTransaction({
        sourceCurrency: source,
        destinationCurrency: destination,
        rate: exchangeRate,
      })
    );
  };

  const isValidConversion = isValidPocketConversion(
    source,
    destination,
    currencyPockets,
    rates
  );

  return (
    <Layout>
      <form onSubmit={performExchange}>
        <div className={styles.container}>
          <ToastContainer
            className={styles.toastWrapper}
            transition={Bounce}
            limit={1}
          />
          <div className={styles.header}>
            <h4>Exchange</h4>
          </div>
          <ExchangeBalance
            onCurrencyChange={(currency) =>
              onCurrencyChange(POCKET.SOURCE, currency)
            }
            onAmountChange={(amount) => onAmountChange(POCKET.SOURCE, amount)}
            amount={source.amount}
            currency={source.currency}
            pocket={currencyPockets}
          />
          <div className={styles.rateContainer}>
            <div
              onClick={onSwitch}
              className={styles.iconContainer}
              data-testid="exchange-switch"
            >
              <FaExchangeAlt className={styles.icon} />
            </div>
            <Rate
              fromCurrency={source.currency}
              toCurrency={destination.currency}
              conversionRate={exchangeRate}
            />
          </div>
          <ExchangeBalance
            type={POCKET.DESTINATION}
            onCurrencyChange={(currency) =>
              onCurrencyChange(POCKET.DESTINATION, currency)
            }
            onAmountChange={(amount) =>
              onAmountChange(POCKET.DESTINATION, amount)
            }
            amount={destination.amount}
            currency={destination.currency}
            pocket={currencyPockets}
          />
        </div>
        <div className={styles.footer}>
          <Button
            type="submit"
            disabled={!isValidConversion || isPerformingConversion}
            className={styles.btn}
            qaIdPrefix="submit"
          >
            Exchange
          </Button>
        </div>
      </form>
    </Layout>
  );
};
export default Exchange;
