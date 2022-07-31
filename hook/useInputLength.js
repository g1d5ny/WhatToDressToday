import React, {useState} from "react";

const useInputLength = (initialValue, maxLength) => {
    const [value, setValue] = useState(initialValue);

    const onChange = (text) => {
        if (text.length > maxLength)
            return;
        setValue(text);
    }

    return {value, onChange, setValue, maxLength};
};

export default useInputLength;
