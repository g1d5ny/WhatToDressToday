import React, { useEffect, useState } from "react"
import { View, Text, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback, Platform, NativeModules } from "react-native"
import { CommonColor, CommonFont } from "../../text/CommonStyle"
import { screenWidth } from "../../style/DimentStyle"
import useInput from "../../hook/useInput"
import { CheckButtonRectangle, TextFieldOnBoarding } from "../../component/ItemComponent"
import { characterOnlyRegex } from "../../component/regex/RegexComponent"
import Loader from "../../component/lottieComponent/Loader"

/**
 * @dates 2022-08-14
 * @author jw
 * @description 온보딩 2
 */
const OnBoardingScreen3_1 = ({ navigation }) => {
    const { StatusBarManager } = NativeModules
    const nickname = useInput("")

    const [statusBarHeight, setStatusBarHeight] = useState(0)

    useEffect(() => {
        Platform.OS === "ios"
            ? StatusBarManager.getHeight(statusBarFrameData => {
                  setStatusBarHeight(statusBarFrameData.height)
              })
            : null
    }, [])

    const NicknameValidCheck = () => {
        if (nickname.value.length >= 1) {
            return characterOnlyRegex.test(nickname.value)
        }
        return false
    }

    const NicknameFunction = () => {
        if (nickname.value.length >= 1) {
            if (characterOnlyRegex.test(nickname.value)) {
                return { borderWidth: 2, color: CommonColor.main_blue, text: "사용 가능한 별명입니다." }
            } else return { borderWidth: 2, color: CommonColor.etc_red, text: "사용 불가능한 별명입니다. (특수문자,공백 제외 5글자)" }
        } else return { borderWidth: 0 }
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView style={{ flex: 1, backgroundColor: "#fff", justifyContent: "space-between" }} behavior={"padding"} keyboardVerticalOffset={statusBarHeight}>
                <View style={{ alignItems: "center" }}>
                    <Text style={[CommonFont.body_2, styles.blueText]}>이름 정하기</Text>
                    <Text style={[CommonFont.bold_on_boarding, { marginBottom: 10 }]}>사용하실 별명을 입력해주세요!</Text>
                    <Text style={[CommonFont.detail_2, { color: CommonColor.basic_gray_dark }]}>5글자 이내의 별명을 입력해주세요.</Text>
                    <View style={{ width: "100%", paddingHorizontal: 15, marginTop: 44 }}>
                        <TextFieldOnBoarding text={nickname} NicknameFunction={NicknameFunction} onSubmitEditing={() => NicknameValidCheck() && navigation.navigate("OnBoardingScreen1", { nickname: nickname.value })} />
                    </View>
                </View>
                <CheckButtonRectangle text={"확인"} activate={NicknameValidCheck()} disabled={!NicknameValidCheck()} onPress={() => navigation.navigate("OnBoardingScreen1", { nickname: nickname.value })} />
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    blueText: {
        color: CommonColor.main_blue,
        marginBottom: 28,
        marginTop: 100
    }
})
export default OnBoardingScreen3_1
