import React from 'react'
import { IExchange, IInput } from '../types'

interface SelectProps {
    input: IInput
    exchange:IExchange[]
    handleSelect:(number:string)=>void
}

export const Select = ({input,exchange,handleSelect}:SelectProps) => {
  return (
    <select className='select' value={input.select} onChange={(event:React.ChangeEvent<HTMLSelectElement>)=>handleSelect(event.target.value)}>
        <option className='option'>UAH</option>
        {exchange && exchange.map((item,index) => 
            <option className='option' key={index}>{item.ccy}</option>
        )
        }
    </select>
  )
}
