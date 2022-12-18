import React from "react"
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native"
import { CommonColor, CommonFont } from "../../text/CommonStyle"
// import IdCard from "../../asset/icon/3d_id_card.svg";
import { screenWidth } from "../../style/DimentStyle"
import IdCard from "../../component/lottieComponent/IdCard"

/**
 * @dates 2022-09-30
 * @author jw
 * @description
 */
const OnBoardingScreen3 = ({ navigation, nickname }) => {
    return (
        <View style={[styles.view, { alignItems: "center", justifyContent: "space-between", marginVertical: 100 }]}>
            <View style={{ alignItems: "center" }}>
                <Text style={[CommonFont.regular_16, styles.blueText]}>이름 정하기</Text>
                <Text style={[CommonFont.bold_on_boarding, { marginBottom: 10 }]}>사용하실 별명을 입력해주세요!</Text>
                <Text style={[CommonFont.body_on_boarding, { color: CommonColor.basic_gray_dark }]}>5글자 이내의 별명을 입력해주세요.</Text>
            </View>
            <IdCard />
            <TouchableOpacity
                style={{
                    width: 360,
                    height: 56,
                    borderRadius: 10,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: CommonColor.basic_gray_light
                }}
                onPress={() => navigation.navigate("OnBoardingScreen3_1")}
            >
                <Text style={[CommonFont.regular_16, { color: nickname === "" ? CommonColor.basic_gray_medium : CommonColor.basic_gray_dark }]}>{nickname === "" ? "별명을 입력하세요" : nickname}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    blueText: {
        color: CommonColor.main_blue,
        marginBottom: 28
        // marginTop: 100,
    },
    view: {
        width: screenWidth
    }
})
export default OnBoardingScreen3
