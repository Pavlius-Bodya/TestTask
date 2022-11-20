import { useState, useEffect } from "react";
import { IData } from "../models";

const useGetCurrencyData = (url:string) => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((result) => {
        setData(result.filter((item:IData) => item.ccy !== 'BTC'))
      });
  }, [url]);

  return data;
};

export default useGetCurrencyData;