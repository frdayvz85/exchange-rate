import React, { useEffect, useState } from "react";
import cn from "classnames";
import {
  CURRENCIES,
  CURRENCY_SYMBOLS,
  EUR,
  POCKET,
} from "../../redux/constants/currencies";
import styles from "./styles.module.scss";
import Currency from "../Currency/Currency";
import { MAX_AMOUNT_ALLOWED } from '../../helpers/global'


const ExchangeBalance = ({
  currency = EUR,
  amount = 0,
  pocket,
  type = POCKET.SOURCE,
  onCurrencyChange,
  onAmountChange,
  qaIdPrefix = type === POCKET.SOURCE
    ? "source-exchange-item"
    : "destination-exchange-item",
}) => {
  const [curr, setCurr] = useState(currency);
  const [inputAmount, setInputAmount] = useState(amount);
  const [exceedsBalance, setExceedsBalance] = useState(false);

  useEffect(() => {
    setInputAmount(amount);
    if (amount > pocket[currency]) {
      setExceedsBalance(true);
    } else if (exceedsBalance) {
      setExceedsBalance(false);
    }
  }, [amount, exceedsBalance, setExceedsBalance, currency, pocket]);

  useEffect(() => {
    setCurr(currency);
  }, [currency]);

  const onSelect = (currencyCode) => {
    setCurr(currencyCode);
    onCurrencyChange(currencyCode);
    if (inputAmount > pocket[currencyCode]) {
      setExceedsBalance(true);
    } else {
      setExceedsBalance(false);
    }
  };

  const isValidTwoDecimalPlaceNumber = (amount) => {
    const regex = new RegExp(/^\d*\.?\d{0,2}$/);
    return regex.test(amount.toString());
  };

  const handleInputChange = (event) => {
    let value = event?.target?.value;

    if (!isValidTwoDecimalPlaceNumber(value) || value > MAX_AMOUNT_ALLOWED)
      return;

    if (value > pocket[curr] && type === POCKET.SOURCE) {
      setExceedsBalance(true);
    } else if (exceedsBalance) {
      setExceedsBalance(false);
    }
    onAmountChange(value);
    setInputAmount(value);
  };

  return (
    <div
      className={cn(styles.container, {
        [styles.destination]: type === POCKET.DESTINATION,
      })}
      data-testid={`${qaIdPrefix}-container`}
    >
      <div className={styles.row} data-testid={`${qaIdPrefix}-select`}>
        <select
          onChange={(e) => onSelect(e.target.value)}
          className={styles.select}
          value={curr}
        >
          {CURRENCIES.map((currency) => (
            <option value={currency} key={currency}>
              {currency}
            </option>
          ))}
        </select>
        <div
          className={cn({
            [styles.inputHeader]: true,
            [styles.minus]: type === POCKET.SOURCE && inputAmount,
            [styles.plus]: type === POCKET.DESTINATION && inputAmount,
            [styles.exceeds]: exceedsBalance && type === POCKET.SOURCE,
            [styles.smallSize]: inputAmount.toString().length > 6,
          })}
        >
          <input
            name={type}
            className={cn({
              [styles.input]: true,
              [styles.errorInput]: exceedsBalance && type === POCKET.SOURCE,
              [styles.bigNumber]: inputAmount.toString().length > 6,
            })}
            placeholder={`${CURRENCY_SYMBOLS[curr]} 0`}
            onChange={handleInputChange}
            value={inputAmount === 0 ? "" : inputAmount}
            autoComplete="off"
            autoFocus={type === POCKET.SOURCE}
            data-testid={`${qaIdPrefix}-input`}
          />
        </div>
      </div>
      <div className={styles.row}>
        <div
          className={styles.balance}
          data-testid={`${qaIdPrefix}-balance`}
        >
          Balance:{" "}
          <Currency
            amount={pocket[curr]}
            currency={currency}
            qaIdPrefix={qaIdPrefix}
          />
        </div>
        {exceedsBalance && type === POCKET.SOURCE && (
          <div
            className={styles.error}
            data-testid={`${qaIdPrefix}-exceeds`}
          >
            exceeds balance
          </div>
        )}
      </div>
    </div>
  );
};
export default ExchangeBalance;
