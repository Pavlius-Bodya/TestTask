import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { IData } from "../models";

type DataState = {
    data: IData[];
}

const initialState: DataState = {
    data:[]
}


export const dataSlice = createSlice({
    name: 'currency_data',
    initialState,
    reducers: {
        setData:(state: DataState, action:PayloadAction<IData[]>)=> {
            state.data=action.payload
        }

    },
})

export const { setData } = dataSlice.actions

export default dataSlice.reducer;