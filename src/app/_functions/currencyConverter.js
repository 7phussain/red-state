"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { standardCurrencies } from "./StandardCurrenciesList";

function useCurrencyInfo(currency = "usd") {
  console.log("currency in hook::: ", currency);
  const [currencies, setCurrencies] = useState({});
  console.log("fetch currencies in hook: ", currencies);

  // https://www.xe.com/api/protected/statistics/?from=USD&to=PKR
  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const res = await axios?.get(
          `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@${
            new Date().toISOString()?.split("T")[0]
          }/v1/currencies/${currency?.toLowerCase()}.json`
        );

        console.log(res?.data, "response data of currencies");

        setCurrencies(res?.data[currency]);
      } catch (error) {
        console.log(error, "error");
      }
    };
    fetchCurrencies();
  }, [currency]);
  const options = Object?.keys(currencies || {});

  const filteredOptions = options.filter((currency) =>
    standardCurrencies.includes(currency?.toUpperCase())
  );
  return [currencies, filteredOptions];
}

export default useCurrencyInfo;
