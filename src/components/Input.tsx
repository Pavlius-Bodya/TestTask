import React from 'react'
import { IInput } from '../types'

interface InputProps {
    input: IInput
    handleInput:(number:string)=>void
}

export const Input = ({input,handleInput}:InputProps) => {
  return (
    <input className='input' type='number' value={input.input} placeholder='Enter the amount' onChange={(event:React.ChangeEvent<HTMLInputElement>)=>handleInput(event.target.value) } />
  )
}
