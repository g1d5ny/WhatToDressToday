import React, {useState} from "react";
import {PriceFunction, PriceMinusComma} from "../function/price/PriceFunction";

const useInputPrice = (initialValue, maxLength) => {
    const [value, setValue] = useState(initialValue);
    const onChange = (text) => {
        if(value.length === 0 && (text === "0" || text === 0) || text.length > maxLength)
            return;
        setValue(PriceMinusComma(text));
    }
    return {value, onChange, setValue, maxLength};
};

export default useInputPrice;

