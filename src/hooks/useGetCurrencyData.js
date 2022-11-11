import { useState, useEffect } from "react";

const useGetCurrencyData = (url) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((result) => {
        setData(result.filter(item => item.ccy !== 'BTC'))
      });
  }, [url]);

  return data;
};

export default useGetCurrencyData;