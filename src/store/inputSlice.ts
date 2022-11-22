import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { IInput } from "../types";


type InputState = {
    input: IInput;
    output: IInput;
}

const initialState: InputState = {
    input: {
        input: '',
        select:'UAH'
    },
    // поміняти інпут на амаунт а селект на каренсі
    output: {
        input:'',
        select:'USD'
    },
    
}


export const inputSlice = createSlice({
    name: 'input',
    initialState,
    reducers: {
        setInput:(state: InputState, action:PayloadAction<string>)=> {
            state.input={...state.input,input:action.payload}
        },
        setSelectInput:(state: InputState, action:PayloadAction<string>)=> {
            state.input={...state.input,select:action.payload}
        },
        setOutput:(state: InputState, action:PayloadAction<string>)=> {
            state.output={...state.output,input:action.payload}
        },
        setSelectOutput:(state: InputState, action:PayloadAction<string>)=> {
            state.output={...state.output,select:action.payload}
        }

    },
})

export const { setInput,setSelectInput,setOutput,setSelectOutput } = inputSlice.actions

export default inputSlice.reducer;