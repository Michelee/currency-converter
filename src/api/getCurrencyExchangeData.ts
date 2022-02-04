import axios from "axios";
import {
  currencyExchangeFormValues,
  exchangeRateInfo,
  fxCurrencyValues,
} from "../constants/types";

const getCurrencyExchangeData = async ({
  baseCurrency,
  targetCurrency,
}: currencyExchangeFormValues) => {
  try {
    const baseUrl = process.env.REACT_APP_RATES_API;
    const exchangeRate = axios.get(
      `${baseUrl}?function=CURRENCY_EXCHANGE_RATE&from_currency=${baseCurrency}&to_currency=${targetCurrency}&apikey=${process.env.REACT_APP_API_KEY}`
    );
    const fxDaily = axios.get(
      `${baseUrl}?function=FX_DAILY&from_symbol=${baseCurrency}&to_symbol=${targetCurrency}&apikey=${process.env.REACT_APP_API_KEY}`
    );

    const data = await Promise.all([exchangeRate, fxDaily]);

    const fxDailyInfo = data[1].data?.["Time Series FX (Daily)"];
    let graphValues: Array<fxCurrencyValues> = [];
    if (fxDailyInfo) {
      for (let elem of Object.keys(fxDailyInfo)) {
        graphValues.push({ date: elem, rate: fxDailyInfo[elem]?.["1. open"] });
      }
    }

    const ratesValues = data[0].data?.["Realtime Currency Exchange Rate"]
    let exchangeRateInfo: exchangeRateInfo = {
      fromCurrencyName: "",
      toCurrencyName: "",
      exchangeRate: ""
    }
    if(ratesValues) {
      exchangeRateInfo = {
        fromCurrencyName: ratesValues["2. From_Currency Name"],
        toCurrencyName: ratesValues["4. To_Currency Name"],
        exchangeRate: ratesValues["5. Exchange Rate"]
      }
    }

    return {
      exchangeRateInfo,
      graphValues: graphValues.slice(0, 30),
    };
  } catch (error) {
    console.error("Error getCurrencyExchangeRate - ", error);
    return { error: "There was an error, please try again" };
  }
};
export default getCurrencyExchangeData;
