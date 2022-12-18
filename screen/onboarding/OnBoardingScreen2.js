import React, { useState } from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { CommonColor, CommonFont } from "../../text/CommonStyle"
import { screenWidth } from "../../style/DimentStyle"
import Man from "../../asset/icon/character_man.svg"
import BlueCheck from "../../asset/icon/check_blue_filled.svg"

/**
 * @dates 2022-08-14
 * @author jw
 * @description 온보딩 2
 */
const OnBoardingScreen2 = ({ gender, setGender, ScrollFunction }) => {
    return (
        <View style={[styles.view, { paddingTop: 170 }]}>
            <View
                style={{
                    paddingHorizontal: 50,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between"
                }}
            >
                <TouchableOpacity
                    style={{
                        backgroundColor: gender === 1 ? "#F6F7FF" : undefined,
                        paddingTop: 20,
                        paddingRight: 10,
                        borderWidth: gender === 1 ? 2 : 0,
                        borderColor: CommonColor.main_blue,
                        borderRadius: 10
                    }}
                    onPress={() => {
                        setGender(1)
                        ScrollFunction()
                    }}
                >
                    <Man />
                    {gender === 1 && (
                        <View style={{ position: "absolute", bottom: -8, right: -8 }}>
                            <BlueCheck width={18} height={18} />
                        </View>
                    )}
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        backgroundColor: gender === 2 ? "#F6F7FF" : undefined,
                        paddingTop: 20,
                        paddingRight: 10,
                        borderWidth: gender === 2 ? 2 : 0,
                        borderColor: CommonColor.main_blue,
                        borderRadius: 10,
                        marginLeft: 15
                    }}
                    onPress={() => {
                        setGender(2)
                        ScrollFunction()
                    }}
                >
                    <Man />
                    {gender === 2 && (
                        <View style={{ position: "absolute", bottom: -8, right: -8 }}>
                            <BlueCheck width={18} height={18} />
                        </View>
                    )}
                </TouchableOpacity>
            </View>
            <View style={{ alignItems: "center", justifyContent: "center" }}>
                <Text style={[CommonFont.regular_16, styles.blueText]}>외형 고르기</Text>
                <Text style={[CommonFont.bold_on_boarding, { marginBottom: 10 }]}>맞춤 코디를 대신 입어줄</Text>
                <Text style={[CommonFont.bold_on_boarding, { marginBottom: 10 }]}>캐릭터를 선택해주세요!</Text>
                <Text style={[CommonFont.body_on_boarding, { color: CommonColor.basic_gray_dark }]}>이후 설정에서 언제든 변경 가능합니다.</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    blueText: {
        color: CommonColor.main_blue,
        marginBottom: 28,
        marginTop: 86
    },
    view: {
        width: screenWidth
        // alignItems: "center",
    }
})
export default OnBoardingScreen2
