import React from "react"
import { ImageBackground, ScrollView, Text, View } from "react-native"
import { screenHeight } from "../../style/DimentStyle"
import { CommonColor, CommonFont, ShadowStyle, TextShadowStyle } from "../../text/CommonStyle"
import HighTemp from "../../asset/icon/temperature_high.svg"
import LowTemp from "../../asset/icon/temperature_low.svg"
import Sun from "../../asset/icon/sunny.svg"
import Moon from "../../asset/icon/moon.svg"
import { DateFormat, UnixTimeToDateTime } from "../../function/common/CommonFunction"

/**
 * @dates 2022-08-14
 * @author jw
 * @description
 */
const WeatherPresenter = ({ navigation, currentWeatherInfo, weekWeatherInfo, hourWeatherInfo, myLocationArray }) => {
    // 일출 - 일몰 / 일몰 - 담날 일출 기준
    // 1. 일출 - 일몰
    const SunRiseSetFunction = () => {
        if (Math.floor(new Date().getTime() / 1000) <= currentWeatherInfo.sunset) {
            return "일출"
        } else {
            return "일몰"
        }
    }

    // 2. 이동 거리
    const DistanceFunction = () => {
        // 1. 일출 - 일몰 / 일몰 - 담날 일출 unixTime 차이 구하기
        let diff = 0
        // 일출 - 일몰
        if (SunRiseSetFunction() === "일출") {
            diff = currentWeatherInfo.sunset - currentWeatherInfo.sunrise
        }
        // 일몰 - 담날 일출
        else {
            diff = weekWeatherInfo[1].sunrise - currentWeatherInfo.sunset
        }

        // 2. 현재 시간 UnixTime
        const todayUnixTime = Math.floor(new Date().getTime() / 1000)

        // 3. 이동 거리
        let distance = 0
        if (SunRiseSetFunction() === "일출") {
            distance = todayUnixTime - currentWeatherInfo.sunrise
        } else {
            distance = todayUnixTime - currentWeatherInfo.sunset
        }

        // 4. 백분율 구하기
        return Math.round((distance / diff) * 100)
    }

    return (
        <ScrollView style={{ flex: 1 }}>
            <ImageBackground source={require("../../asset/image/background_temp.png")} resizeMode='cover' style={{ width: "100%", height: screenHeight, backgroundColor: "#fff" }}>
                <View
                    style={[
                        ShadowStyle,
                        {
                            width: "100%",
                            height: 2,
                            backgroundColor: "#fff",
                            marginTop: 20,
                            paddingHorizontal: 34
                        }
                    ]}
                >
                    <View style={{ width: DistanceFunction() + "%", height: 2, backgroundColor: SunRiseSetFunction() === "일출" ? CommonColor.sun_yellow : CommonColor.moon_yellow }} />
                    <View style={{ marginLeft: DistanceFunction() + "%", left: -12, bottom: 10 }}>
                        {SunRiseSetFunction() === "일출" ? <Sun width={24} height={24} /> : <Moon width={24} height={24} />}
                        <Text style={[CommonFont.semi_bold_12, { color: SunRiseSetFunction() === "일출" ? CommonColor.sun_yellow : CommonColor.moon_yellow }]}>
                            {new Date().getHours()}:{new Date().getMinutes()}
                        </Text>
                    </View>
                </View>
                <View style={{ width: "100%", justifyContent: "space-between", flexDirection: "row", alignItems: "center", paddingHorizontal: 20, marginTop: 10 }}>
                    <View style={{ alignItems: "center" }}>
                        <Text style={[CommonFont.semi_bold_12, { color: CommonColor.main_white }]}>{SunRiseSetFunction() === "일출" ? "일출" : "일몰"}</Text>
                        <Text style={[CommonFont.semi_bold_12, { color: CommonColor.main_white }]}>{SunRiseSetFunction() === "일출" ? UnixTimeToDateTime(currentWeatherInfo.sunrise) : UnixTimeToDateTime(currentWeatherInfo.sunset)}</Text>
                    </View>
                    <View style={{ alignItems: "center" }}>
                        <Text style={[CommonFont.semi_bold_12, { color: CommonColor.main_white }]}>{SunRiseSetFunction() === "일출" ? "일몰" : "일출"}</Text>
                        <Text style={[CommonFont.semi_bold_12, { color: CommonColor.main_white }]}>{SunRiseSetFunction() === "일출" ? UnixTimeToDateTime(currentWeatherInfo.sunset) : UnixTimeToDateTime(weekWeatherInfo[1].sunrise)}</Text>
                    </View>
                </View>
                <View style={{ marginHorizontal: 20, marginTop: 16 }}>
                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                        <View>
                            <Text style={[CommonFont.semi_bold_26, TextShadowStyle, { color: CommonColor.main_white }]}>체감온도가 {currentWeatherInfo.feelsLike}˚예요.</Text>
                            <Text style={[CommonFont.semi_bold_26, TextShadowStyle, { marginTop: 6, color: CommonColor.main_white }]}>감기 조심하세요!</Text>
                        </View>
                        <Text style={[CommonFont.semi_bold_35, TextShadowStyle, { color: CommonColor.main_white, fontSize: 66 }]}>{currentWeatherInfo.currentTemp}˚</Text>
                    </View>
                    <View style={{ marginTop: 8, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                        <Text style={[CommonFont.regular_14, { color: CommonColor.main_white }]}>
                            {myLocationArray[0].location} | {DateFormat()}
                        </Text>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <HighTemp width={12} height={12} />
                            <Text style={[CommonFont.regular_14, { marginLeft: 10, color: CommonColor.main_white }]}>{currentWeatherInfo.max}˚</Text>
                            <Text style={[CommonFont.regular_14, { marginHorizontal: 10, color: CommonColor.main_white }]}>|</Text>
                            <LowTemp width={12} height={12} />
                            <Text style={[CommonFont.regular_14, { marginLeft: 10, color: CommonColor.main_white }]}>{currentWeatherInfo.min}˚</Text>
                        </View>
                    </View>
                    <View style={{ marginTop: 32, flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between" }}>
                        {/*<Girl />*/}
                        <View>
                            <Text style={[CommonFont.semi_bold_16, { marginRight: 20, color: CommonColor.main_white }]}>기온 맞춤 추천 의상</Text>
                            <View style={[ShadowStyle, { width: 136, height: 186, backgroundColor: "#fff", marginTop: 20, borderRadius: 10 }]}></View>
                        </View>
                    </View>
                </View>
            </ImageBackground>
        </ScrollView>
    )
}
export default WeatherPresenter
