import { useState, useEffect } from "react";
import { IExchange } from "../types";

const useGetCurrencyData = (url:string) => {
  const [data, setData] = useState<IExchange[]>();

  useEffect(() => {
    const getResponse =async()=>{
      const response = await fetch(url)
      const result =await response.json()
      setData(result.filter((item:IExchange) => item.ccy !== 'BTC'))
    }
    getResponse()
  }, [url]);

  return data;
};

export default useGetCurrencyData;