import {useEffect} from 'react'
import './App.css';
import useGetCurrencyData from './hooks/useGetCurrencyData';
import { setData } from './store/dataSlice';
import { Converter } from './components/Converter';
import { Header } from './components/Header';
import { IData } from './models';
import { Loader } from './components/Loader';
import {useAppDispatch} from "./store/store"

function App() {
  const data: IData[] = useGetCurrencyData("https://cors-anywhere.herokuapp.com/https://api.privatbank.ua/p24api/pubinfo?exchange&coursid=11");
  console.log('appData',data)
  
  const dispatch = useAppDispatch();
  useEffect(() => {
    data && dispatch(
       setData(data)
     )
   },[data])
  
  return (
    <div className="App">
      {data ?
        <>
          <Header />
          <Converter/>
        </> :
        <Loader/>
      }
    </div>
  );
}

export default App;
