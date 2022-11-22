import  { useEffect, useState} from 'react'
import { useAppDispatch, useAppSelector } from "../store/store"
import {
  setInputAmount,
  setInputCurrency,
  setOutputAmount,
  setOutputCurrency
} from '../store/inputSlice';

import {
  hryvniaBuyCurrency,
  currencyBuyHryvnia,
  currencyBuyCurrency,
  cofCurrencyBuy,
  cofCurrencySale,
} from '../utilities/index'
import { Input } from './Input';
import { Select } from './Select';



export const Converter = () => {
  const dispatch = useAppDispatch();

  const [selectValue, setSelectValue] = useState<string>('');
  const [inputValue, setInputValue] = useState<string>('');

  const { input } = useAppSelector((state) => state.input);
  const { output } = useAppSelector((state) => state.input);
  
  const { exchange } = useAppSelector((state) => state.data);

  const handleInput = (number: string) => {    
    dispatch(setInputAmount(number ));
    setInputValue(number);
  }
  const handleOutput = (number: string) => {    
    dispatch(setOutputAmount(number ));
    setInputValue(number);
  }
  const handleInputSelect = (value: string) => {   
    if (output.currency === value) return;
    dispatch(setInputCurrency(value ));
    setSelectValue(value);
  }
  const handleOutputSelect = (value: string) => {   
    if (input.currency === value) return;
    dispatch(setOutputCurrency(value ));
    setSelectValue(value);
  }
  
  useEffect(() => {
    converterSelect(selectValue)
  }, [selectValue]);

  useEffect(() => {
    converterInput(inputValue)
  }, [inputValue]);
  
  const converterInput = (number:string) => {
    if (!exchange) return;
    if (number === input.amount){
      if (input.currency === 'UAH') {
        dispatch(setOutputAmount(hryvniaBuyCurrency(number, cofCurrencySale, output, exchange)));
        
      } else if (output.currency ==='UAH') {
        dispatch(setOutputAmount(currencyBuyHryvnia(number, cofCurrencyBuy, input, exchange)));
      }
      else {
        dispatch(setOutputAmount(currencyBuyCurrency(number, cofCurrencySale, cofCurrencySale, input, output, exchange)) );
      }  
    } else {
      if (output.currency === 'UAH') {
        dispatch(setInputAmount(hryvniaBuyCurrency(number, cofCurrencyBuy, input, exchange) ));        
      } else if (input.currency === 'UAH') {
        dispatch(setInputAmount(currencyBuyHryvnia(number, cofCurrencySale, output, exchange) ));
      }
      else {
        dispatch(setInputAmount(currencyBuyCurrency(number, cofCurrencyBuy, cofCurrencyBuy, output, input, exchange) ));
      } 
    }
    
  }
  const converterSelect = (value:string) => {
    if (value === input.currency) {
      converterInput(input.amount);
    } else {
      converterInput(output.amount);
    }
  }
  
  
  
  return (
    <div className='converter'>
      <div className='container'>
        <div className='converter-form'>
          <Select input={input} exchange={exchange} handleSelect={handleInputSelect} />
          <Input input={input} handleInput={handleInput} />
        </div>
        <div className='converter-form'>
          <Select input={output} exchange={exchange} handleSelect={handleOutputSelect} />
          <Input input={output} handleInput={handleOutput} />
        </div>
      </div>
    </div>
  )
}
