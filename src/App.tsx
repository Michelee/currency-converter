import React, { ChangeEvent, FormEvent, useState } from "react";
import Dropdown from "./components/Dropdown";
import RatesChart from "./components/RatesChart";
import digitalCurrencyValues from "./data/digital-currency.json";
import physicalCurrencyValues from "./data/physical-currency.json";
import getCurrencyExchangeData from "./api/getCurrencyExchangeData";
import { exchangeRateInfo, fxCurrencyValues } from "./constants/types";
import "./styles/App.css";

const App = () => {
  const [formValues, setFormValue] = useState({
    baseCurrency: "",
    targetCurrency: "",
    amount: 0,
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [graphValues, setGraphValues] = useState<Array<fxCurrencyValues>>();
  const [exchangeValues, setExchangeValues] = useState<exchangeRateInfo>();
  const [convertedAmount, setConvertedAmount] = useState(0);

  const handleChange = (
    val: ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    setError("");
    setFormValue({ ...formValues, [val.target.name]: val.target.value });
  };

  const handleSubmition = async (ev: FormEvent) => {
    ev.preventDefault();
    setLoading(true);
    const { baseCurrency, targetCurrency, amount } = formValues;

    if (!baseCurrency || !targetCurrency || !amount) {
      setError("Please complete all the values");
      setLoading(false);

      return;
    }

    const resp = await getCurrencyExchangeData(formValues);
    setGraphValues(resp?.graphValues);

    if (resp?.exchangeRateInfo?.exchangeRate) {
      const rate = parseFloat(resp?.exchangeRateInfo?.exchangeRate);
      setConvertedAmount(rate * formValues.amount);
      setExchangeValues(resp?.exchangeRateInfo);
    }
    setLoading(false);
  };

  return (
    <div className="app__container">
      <div className="app__title" data-testid="app-title">
        <h1>Currency Converter</h1>
      </div>
      <div className="app__content">
        <form className="app__form" onSubmit={(ev) => handleSubmition(ev)}>
          <div
            className="app__dropdowns-box"
            data-testid="base-currency-dropdowns"
          >
            <h3>Base Currency</h3>
            <Dropdown
              options={physicalCurrencyValues}
              id="physicalFrom"
              name="baseCurrency"
              label="Psysical Currency"
              value={formValues.baseCurrency}
              handleChange={handleChange}
            />
            <Dropdown
              options={digitalCurrencyValues}
              id="digitalFrom"
              name="baseCurrency"
              label="Digital Currency"
              value={formValues.baseCurrency}
              handleChange={handleChange}
            />
          </div>
          <div
            className="app__dropdowns-box"
            data-test="target-currency-dropdowns"
          >
            <h3>Target Currency</h3>
            <Dropdown
              options={physicalCurrencyValues}
              id="physicalTo"
              name="targetCurrency"
              label="Psysical Currency"
              value={formValues.targetCurrency}
              handleChange={handleChange}
            />
            <Dropdown
              options={digitalCurrencyValues}
              id="digitalTo"
              name="targetCurrency"
              label="Digital Currency"
              value={formValues.targetCurrency}
              handleChange={handleChange}
            />
          </div>
          <div className="app__amount-box">
            <h3>Amount</h3>
            <input
              type="number"
              name="amount"
              className="app__amount-input"
              onChange={handleChange}
            />
          </div>

          {error && <span className="app__form-error">{error}</span>}
          {loading ? (
            <span className="app__form-loading">Loading...</span>
          ) : (
            <input
              data-test="submit-button"
              type="submit"
              className="app__form-submit-button"
              value="Calculate"
            />
          )}
        </form>
        <div className="app__results-box">
          {exchangeValues?.exchangeRate || graphValues?.length ? (
            <h2>Results </h2>
          ) : (
            ""
          )}
          {exchangeValues?.exchangeRate && (
            <div className="">
              <span>
                1 {exchangeValues.fromCurrencyName} is equal to{" "}
                {parseFloat(exchangeValues.exchangeRate)}{" "}
                {exchangeValues.toCurrencyName}
              </span>
              <h3>The converted amount is {convertedAmount.toFixed(2)} {exchangeValues.toCurrencyName}s</h3>
            </div>
          )}
          {graphValues?.length ? <RatesChart data={graphValues} /> : ""}
        </div>
      </div>
    </div>
  );
};

export default App;
