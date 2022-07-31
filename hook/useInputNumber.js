import React, {useState} from "react";
import {OnlyNumberInput, PriceFunction, PriceMinusComma} from "../function/price/PriceFunction";

const useInputNumber = (initialValue, maxLength) => {
    const [value, setValue] = useState(initialValue);
    const onChange = (text) => {
        if(text.length > maxLength)
            return;
        setValue(OnlyNumberInput(text));
    }
    return {value, onChange, setValue, maxLength};
};

export default useInputNumber;

