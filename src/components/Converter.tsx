import  { useEffect, useState, FC } from 'react'
import {IInput } from '../models';

import { useAppSelector} from "../store/store"

import {
  hryvniaBuyCurrency,
  currencyBuyHryvnia,
  currencyBuyCurrency,
  cofCurrencyBuy,
  cofCurrencySale,
  handleInput,
  handleInputValue
} from '../utilities/index'



export const Converter = () => {
  const [input, setInput] = useState<IInput>({ input: '', select: 'UAH' });
  const [output, setOutput] = useState<IInput>({ input: '', select: 'USD' });
  const [selectValue, setSelectValue] = useState<string>();
  const [inputValue, setInputValue] = useState<string>();

  const data = useAppSelector((state) => state.data.data)
  
  useEffect(() => {
    converterSelect(selectValue!)
  }, [selectValue]);

  useEffect(() => {
    converterInput(inputValue!)
  }, [inputValue]);
  
  const converterInput = (number:string) => {
    if (data) {
      if (number === input.input) {
        if (input.select === 'UAH') {
          setOutput({ ...output, input: hryvniaBuyCurrency(number, cofCurrencySale, output, data) });
        } else if (output.select ==='UAH') {
          setOutput({ ...output, input: currencyBuyHryvnia(number, cofCurrencyBuy, input, data) });
        }
        else {
          setOutput({ ...output, input: currencyBuyCurrency(number, cofCurrencySale, cofCurrencySale, input, output, data) });
        }  
      } else {
        if (output.select === 'UAH') {
          setInput({ ...input, input: hryvniaBuyCurrency(number, cofCurrencyBuy, input, data) });        
        } else if (input.select === 'UAH') {
          setInput({ ...input, input: currencyBuyHryvnia(number, cofCurrencySale, output, data) });
        }
        else {
          setInput({ ...input, input: currencyBuyCurrency(number, cofCurrencyBuy, cofCurrencyBuy, output, input, data) });
        } 
      }
    }
  }
  const converterSelect = (value:string) => {
    if (value === input.select) {
      converterInput(output.input);
    } else {
      converterInput(input.input);
    }
  }
  
  
  
  return (
    <div className='converter'>
      <div className='container'>
        <div className='converter-form'>
          <select className='select' value={input.select} onChange={(event:React.ChangeEvent<HTMLSelectElement>)=>handleInputValue(event.target.value,setInput,setSelectValue,input)}>
            <option className='option'>UAH</option>
            {data && data.map((item,index) => 
              <option className='option' key={index}>{item.ccy}</option>
            )
          }
          </select>
          <input className='input' type='number' value={input.input} placeholder='Enter the amount' onChange={(event:React.ChangeEvent<HTMLInputElement>)=>handleInput(event.target.value,setInput,setInputValue) } />
        </div>
        <div className='converter-form'>
          <select className='select' value={output.select} onChange={(event:React.ChangeEvent<HTMLSelectElement>)=>handleInputValue(event.target.value,setOutput,setSelectValue,output)}>
            <option className='option'>UAH</option>
            {data && data.map((item, index) => 
              <option className='option' key={index}>{item.ccy}</option>
            )
          }
          </select>
          <input className='input' type='number' value={output.input} placeholder='Enter the amount' onChange={(event:React.ChangeEvent<HTMLInputElement>)=>handleInput(event.target.value,setOutput,setInputValue) }/>
        </div>
      </div>
    </div>
  )
}
