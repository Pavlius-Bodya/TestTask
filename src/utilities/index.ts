import { IExchange, IInput } from "../types";

export const hryvniaBuyCurrency = (number:string, method:(value:IInput, data:IExchange[]) => string, value:IInput, data:IExchange[]) => (+number / +method(value, data)).toFixed(2);
export const currencyBuyHryvnia = (number:string, method:(value:IInput, data:IExchange[]) => string , value:IInput, data:IExchange[]) => (+method(value, data) * +number).toFixed(2);
export const currencyBuyCurrency = (number:string, method1:(value:IInput, data:IExchange[]) => string, method2:(value:IInput, data:IExchange[]) => string, value1:IInput, value2:IInput, data:IExchange[]) => (+number * +method1(value1, data) / +method2(value2, data)).toFixed(2);

export const cofCurrencyBuy = (input: IInput, data: IExchange[]): string => data.filter((item: IExchange) => item.ccy === input.currency)[0]?.buy;
export const cofCurrencySale = (input: IInput, data: IExchange[]): string => data.filter((item: IExchange) => item.ccy === input.currency)[0]?.sale;
