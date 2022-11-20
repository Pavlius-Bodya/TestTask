import { IData,IInput } from "../models";

export const hryvniaBuyCurrency = (number:string, method:(value:IInput, data:IData[]) => any, value:IInput, data:IData[]) => (+number / method(value, data)).toFixed(2);
export const currencyBuyHryvnia = (number:string, method:any, value:IInput, data:IData[]) => (method(value, data) * +number).toFixed(2);
export const currencyBuyCurrency = (number:string, method1:any, method2:any, value1:IInput, value2:IInput, data:IData[]) => (+number * method1(value1, data) / method2(value2, data)).toFixed(2);

export const cofCurrencyBuy = (input:IInput, data:IData[]) => data.find((item:any) => item.ccy === input.select)?.buy;
export const cofCurrencySale = (input:IInput, data:IData[]) => data.find((item:any) => item.ccy === input.select)?.sale;

export const handleInput = (number:string, setInput:any, setInputValue:any) => {
    setInput((prev:IInput) => ({ ...prev, input: number }));
    setInputValue(number);
};

export const handleInputValue = (value:string, setInput:any, setSelectValue:any, output:IInput) => {
    if (output.select !== value) {
        setInput((prev:IInput) => ({ ...prev, select: value }));
        setSelectValue(value);
    };
};
