import './App.css';
import React, { useEffect, useState } from 'react'
import useGetCurrencyData from './services/hooks/useGetCurrencyData';
import { Converter } from './Components/Converter';
import { Header } from './Components/Header';

function App() {
  const [data] = useGetCurrencyData("https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5")
  
  return (
    <div className="App">
      <Header data={data}  />
      <Converter data={data}/>
    </div>
  );
}

export default App;
