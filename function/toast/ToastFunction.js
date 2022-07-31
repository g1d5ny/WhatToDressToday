import Toast from "react-native-toast-message";
import {Platform} from "react-native";

export const ToastFunction = (text) => {
    Toast.show({
        type: 'my_custom_type',
        text1: text,
        position: 'bottom',
        bottomOffset: Platform.OS === 'ios' ? 100 : 80,
    })
}

export const PushToastFunction = (text1, text2) => {
    Toast.show({
        type: 'push_custom_type',
        text1: text1,
        text2: text2,
        position: 'bottom',
        bottomOffset: Platform.OS === 'ios' ? 100 : 80,
    })
}
