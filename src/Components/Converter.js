import React, { useEffect, useState } from 'react'

export const Converter = ({ data }) => {
  const [firstInput,setFirstInput]=useState({input:'',select:'UAH'})
  const [secondInput, setSecondInput] = useState({ input: '', select: 'USD' })
  
  const [selectValue,setSelectValue]=useState()
  const [selectInput, setSelectInput] = useState()

  const regEx = {
    numeric: /^[0-9]*[.,]?[0-9]*$/,
  };
  


  const handleFirstInput = (number) => {
    setFirstInput({ ...firstInput, input: number })
    setSelectInput(number)
  }
  const handleSecondInput = (number) => {
    setSecondInput({ ...secondInput, input: number })
    setSelectInput(number)
  }  
  const handleFirstSelect = (value) => {
    if (secondInput.select !== value) {      
      setFirstInput(prev=>({ ...prev, select: value }))
      setSelectValue(value)
    }
  }  
  
  const handleSecondSelect = (value) => {
    if(firstInput.select!==value){
      setSecondInput(prev => ({ ...prev, select: value }))
      setSelectValue(value)
    }
  }

  const cofCurrencyBuy=(input)=>data.filter(item => item.ccy === input.select)[0].buy
  const cofCurrencySale = (input) => data.filter(item => item.ccy === input.select)[0].sale


  useEffect(() => {
    converterSelect(selectValue)
  }, [selectValue])

  useEffect(() => {
    converterInput(selectInput)
  }, [selectInput])
  
  const converterInput = (number) => {
    if (data) {
      if (number === firstInput.input) {
        if (firstInput.select === 'UAH') {
          
          setSecondInput({ ...secondInput, input: (number / cofCurrencySale(secondInput)).toFixed(2) })
          
        } else if (firstInput.select === 'USD' && secondInput.select === 'EUR' || firstInput.select === 'EUR' && secondInput.select === 'USD') {

          setSecondInput({ ...secondInput, input: (number*cofCurrencySale(firstInput)/cofCurrencySale(secondInput)).toFixed(2) })
        }
        else {

          setSecondInput({ ...secondInput, input: (cofCurrencyBuy(firstInput) * number).toFixed(2) })
        }  
      } else {
        if (secondInput.select === 'UAH') {

          setFirstInput({ ...firstInput, input: (number / cofCurrencyBuy(firstInput)).toFixed(2) })
          
        } else if (firstInput.select === 'USD' && secondInput.select === 'EUR' || firstInput.select === 'EUR' && secondInput.select === 'USD') {

          setFirstInput({ ...firstInput, input: (number*cofCurrencyBuy(secondInput)/cofCurrencyBuy(firstInput)).toFixed(2) })
        }
        else {
          setFirstInput({ ...firstInput, input: (cofCurrencySale(secondInput) * number).toFixed(2) })
        } 
      }
    }
  }

  const converterSelect = (value) => {
    if (value === firstInput.select) {
      converterInput(secondInput.input)
    } else {
      converterInput(firstInput.input)
    }
  }
  
  
  
  return (
    <div className='converter'>
      <div className='container'>
        <div className='converter-form'>
          <select className='select' value={firstInput.select} onChange={(e)=>handleFirstSelect(e.target.value)}>
            <option className='option'>UAH</option>
            {data && data.map((item,index) => 
              <option className='option' key={index}>{item.ccy}</option>
            )
          }
          </select>
          <input className='input' pattern={ /^[0-9]*[.,]?[0-9]*$/} value={firstInput.input} placeholder='Enter the amount' onChange={(e)=>handleFirstInput(e.target.value) } />
        </div>
        <div className='converter-form'>
          <select className='select' value={secondInput.select} onChange={(e)=>handleSecondSelect(e.target.value)}>
            <option className='option'>UAH</option>
            {data && data.map((item, index) => 
              <option className='option' key={index}>{item.ccy}</option>
            )
          }
          </select>
          <input className='input' pattern='/^[0-9]*[.,]?[0-9]*$/' value={secondInput.input} placeholder='Enter the amount' onChange={(e)=>handleSecondInput(e.target.value) }/>
        </div>
      </div>
    </div>
  )
}
