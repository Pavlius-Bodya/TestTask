import './App.css';
import React,{ useEffect, useState } from 'react'
import { Converter } from './Components/Converter';
import { Header } from './Components/Header';

function App() {
  const [data,setData]=useState(null)
  useEffect(() => {
    fetch('https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5')
      .then((res) => res.json())
      .then((result) => {
          setData(result.filter(item=>item.ccy!=='BTC'))
      })
  }, [])
  
  return (
    <div className="App">
      <Header data={data}  />
      <Converter data={data}/>
    </div>
  );
}

export default App;
