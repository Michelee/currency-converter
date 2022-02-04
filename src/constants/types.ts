export interface currencyExchangeFormValues {
  baseCurrency: string;
  targetCurrency: string;
  amount: number;
}

export interface fxCurrencyValues {
  rate: string;
  date: string;
}

export interface exchangeRateInfo {
  fromCurrencyName: string;
  toCurrencyName: string;
  exchangeRate: string;
}
