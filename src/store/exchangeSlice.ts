import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { IExchange } from "../types";

type ExchangeState = {
    exchange: IExchange[];
}

const initialState: ExchangeState = {
    exchange: [],
    
}


export const exchangeSlice = createSlice({
    name: 'exchange',
    initialState,
    reducers: {
        setExchange:(state: ExchangeState, action:PayloadAction<IExchange[]>)=> {
            state.exchange=action.payload
        }

    },
})

export const { setExchange } = exchangeSlice.actions

export default exchangeSlice.reducer;