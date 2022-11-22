import  { useEffect, useState} from 'react'
import { useAppDispatch, useAppSelector } from "../store/store"
import {
  setInput,
  setSelectInput,
  setOutput,
  setSelectOutput
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
    dispatch(setInput(number ));
    setInputValue(number);
  }
  const handleOutput = (number: string) => {    
    dispatch(setOutput(number ));
    setInputValue(number);
  }
  const handleInputSelect = (value: string) => {   
    if (output.select === value) return;
    dispatch(setSelectInput(value ));
    setSelectValue(value);
  }
  const handleOutputSelect = (value: string) => {   
    if (input.select === value) return;
    dispatch(setSelectOutput(value ));
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
    if (number === input.input){
      if (input.select === 'UAH') {
        dispatch(setOutput(hryvniaBuyCurrency(number, cofCurrencySale, output, exchange)));
        
      } else if (output.select ==='UAH') {
        dispatch(setOutput(currencyBuyHryvnia(number, cofCurrencyBuy, input, exchange)));
      }
      else {
        dispatch(setOutput(currencyBuyCurrency(number, cofCurrencySale, cofCurrencySale, input, output, exchange)) );
      }  
    } else {
      if (output.select === 'UAH') {
        dispatch(setInput(hryvniaBuyCurrency(number, cofCurrencyBuy, input, exchange) ));        
      } else if (input.select === 'UAH') {
        dispatch(setInput(currencyBuyHryvnia(number, cofCurrencySale, output, exchange) ));
      }
      else {
        dispatch(setInput(currencyBuyCurrency(number, cofCurrencyBuy, cofCurrencyBuy, output, input, exchange) ));
      } 
    }
    
  }
  const converterSelect = (value:string) => {
    if (value === input.select) {
      converterInput(input.input);
    } else {
      converterInput(output.input);
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
