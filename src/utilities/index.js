export const hryvniaBuyCurrency = (number, method, value, data) => (number / method(value, data)).toFixed(2);
export const currencyBuyHryvnia = (number, method, value, data) => (method(value, data) * number).toFixed(2);
export const currencyBuyCurrency = (number, method1, method2, value1, value2, data) => (number * method1(value1, data) / method2(value2, data)).toFixed(2);

export const cofCurrencyBuy = (input, data) => data.find(item => item.ccy === input.select).buy;
export const cofCurrencySale = (input, data) => data.find(item => item.ccy === input.select).sale;

export const handleInput = (number, setInput, setInputValue) => {
    setInput(prev => ({ ...prev, input: number }));
    setInputValue(number);
};

export const handleOutput = (number, setOutput, setInputValue) => {
    setOutput(prev => ({ ...prev, input: number }));
    setInputValue(number);
};

export const handleInputValue = (value, setInput, setSelectValue, output) => {
    if (output.select !== value) {
        setInput(prev => ({ ...prev, select: value }));
        setSelectValue(value);
    };
};
  
export const handleOutputValue = (value, setOutput, setSelectValue, input) => {
    if (input.select !== value) {
        setOutput(prev => ({ ...prev, select: value }));
        setSelectValue(value);
    };
};
