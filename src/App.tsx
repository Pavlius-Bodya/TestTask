import {useEffect} from 'react'
import './App.css';
import useGetCurrencyData from './hooks/useGetCurrencyData';
import { setExchange } from './store/exchangeSlice';
import { Converter } from './components/Converter';
import { Header } from './components/Header';
import { Loader } from './components/Loader';
import {useAppDispatch} from "./store/store"

function App() {
  const exchange= useGetCurrencyData("https://cors-anywhere.herokuapp.com/https://api.privatbank.ua/p24api/pubinfo?exchange&coursid=11");
  
  const dispatch = useAppDispatch();
  useEffect(() => {
    exchange && dispatch(
       setExchange(exchange)
     )
   },[exchange])
  
  return (
    <div className="App">
      {exchange ?
        <>
          <Header />
          <Converter />
          
        </> :
        <Loader/>
      }
    </div>
  );
}

export default App;
