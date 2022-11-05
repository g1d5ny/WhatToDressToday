import React, { useState } from "react"
import { Text, View, ImageBackground, ScrollView } from "react-native"
import useInputLength from "../../hook/useInputLength"
import useInput from "../../hook/useInput"
import { screenHeight } from "../../style/DimentStyle"
import { CommonColor, CommonFont } from "../../text/CommonStyle"

/**
 * @dates 2022-08-14
 * @author jw
 * @description
 */
const WeatherPresenter = ({ navigation, skinColor, gender, nickname, myLocationArray }) => {
    // console.log("skinColor: ", skinColor, ", gender: ", gender, ", nickname:", nickname, ", myLocationArray: ", myLocationArray)
    return (
        <ScrollView style={{ flex: 1 }}>
            <ImageBackground source={require("../../asset/image/background_temp.png")} resizeMode='cover' style={{ width: "100%", height: screenHeight, backgroundColor: "#fff" }}>
                <View
                    style={{
                        width: "100%",
                        height: 2,
                        backgroundColor: "#fff",
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 2
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,

                        elevation: 5,
                        marginTop: 20
                    }}
                ></View>
                <View style={{ width: "100%", justifyContent: "space-between", flexDirection: "row", alignItems: "center", paddingHorizontal: 20, marginTop: 10 }}>
                    <View style={{ alignItems: "center" }}>
                        <Text style={[CommonFont.semi_bold_12, { color: CommonColor.main_white }]}>일출</Text>
                        <Text style={[CommonFont.semi_bold_12, { color: CommonColor.main_white }]}>00:00</Text>
                    </View>
                    <View style={{ alignItems: "center" }}>
                        <Text style={[CommonFont.semi_bold_12, { color: CommonColor.main_white }]}>일몰</Text>
                        <Text style={[CommonFont.semi_bold_12, { color: CommonColor.main_white }]}>00:00</Text>
                    </View>
                </View>
            </ImageBackground>
        </ScrollView>
    )
}
export default WeatherPresenter
