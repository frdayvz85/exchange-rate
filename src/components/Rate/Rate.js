import React, { memo } from "react";
import styles from "./styles.module.scss";
import Currency from "../Currency/Currency";
import { FaChartLine } from "react-icons/fa";

const Rate = memo(({ fromCurrency, toCurrency, conversionRate }) => {
  return (
    <div className={styles.container} data-testid="rate-container">
      <FaChartLine className={styles.icon} />
      <Currency
        currency={fromCurrency}
        amount={1}
        precision={0}
        qaIdPrefix="from-currency"
      />
      <span>{" = "}</span>
      <Currency
        currency={toCurrency}
        amount={conversionRate}
        precision={4}
        qaIdPrefix="to-currency"
      />
    </div>
  );
});
export default Rate;
