import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { IInput } from "../types";


type InputState = {
    input: IInput;
    output: IInput;
}

const initialState: InputState = {
    input: {
        amount: '',
        currency:'UAH'
    },
    output: {
        amount:'',
        currency:'USD'
    },
    
}


export const inputSlice = createSlice({
    name: 'input',
    initialState,
    reducers: {
        setInputAmount:(state: InputState, action:PayloadAction<string>)=> {
            state.input={...state.input,amount:action.payload}
        },
        setInputCurrency:(state: InputState, action:PayloadAction<string>)=> {
            state.input={...state.input,currency:action.payload}
        },
        setOutputAmount:(state: InputState, action:PayloadAction<string>)=> {
            state.output={...state.output,amount:action.payload}
        },
        setOutputCurrency:(state: InputState, action:PayloadAction<string>)=> {
            state.output={...state.output,currency:action.payload}
        }

    },
})

export const { setInputAmount,setInputCurrency,setOutputAmount,setOutputCurrency } = inputSlice.actions

export default inputSlice.reducer;