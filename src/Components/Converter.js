import  { useEffect, useState } from 'react'

import {hryvniaBuyCurrency,currencyBuyHryvnia,currencyBuyCurrency,cofCurrencyBuy,cofCurrencySale,handleInput,handleOutput,handleInputValue,handleOutputValue} from '../utilities/index'

export const Converter = ({ data }) => {
  const [input, setInput] = useState({ input: '', select: 'UAH' });
  const [output, setOutput] = useState({ input: '', select: 'USD' });
  const [selectValue, setSelectValue] = useState();
  const [inputValue, setInputValue] = useState();
  
  useEffect(() => {
    converterSelect(selectValue)
  }, [selectValue]);

  useEffect(() => {
    converterInput(inputValue)
  }, [inputValue]);
  
  const converterInput = (number) => {
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
  const converterSelect = (value) => {
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
          <select className='select' value={input.select} onChange={(e)=>handleInputValue(e.target.value,setOutput,setSelectValue,output)}>
            <option className='option'>UAH</option>
            {data && data.map((item,index) => 
              <option className='option' key={index}>{item.ccy}</option>
            )
          }
          </select>
          <input className='input' type='number' value={input.input} placeholder='Enter the amount' onChange={(e)=>handleInput(e.target.value,setInput,setInputValue) } />
        </div>
        <div className='converter-form'>
          <select className='select' value={output.select} onChange={(e)=>handleOutputValue(e.target.value,setInput,setSelectValue,input)}>
            <option className='option'>UAH</option>
            {data && data.map((item, index) => 
              <option className='option' key={index}>{item.ccy}</option>
            )
          }
          </select>
          <input className='input' type='number' value={output.input} placeholder='Enter the amount' onChange={(e)=>handleOutput(e.target.value,setOutput,setInputValue) }/>
        </div>
      </div>
    </div>
  )
}
