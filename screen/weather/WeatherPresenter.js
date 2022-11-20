import React from "react"
import { ImageBackground, ScrollView, Text, View } from "react-native"
import { screenHeight } from "../../style/DimentStyle"
import { CommonColor, CommonFont, ShadowStyle, TextShadowStyle } from "../../text/CommonStyle"
import Moon from "../../asset/icon/moon.svg"
import Sun from "../../asset/icon/sunny.svg"
import HighTemp from "../../asset/icon/temperature_high.svg"
import LowTemp from "../../asset/icon/temperature_low.svg"
import Girl from "../../asset/icon/3d_girl.svg"
import { DateFormat } from "../../function/common/CommonFunction"

/**
 * @dates 2022-08-14
 * @author jw
 * @description
 */
const WeatherPresenter = ({ navigation, weatherInfo, myLocationArray }) => {
    // const HourDiff = weatherInfo.sunset === undefined ? 0 : (weatherInfo.sunset.split(":")[0] - weatherInfo.sunrise.split(":")[0]).toString()
    // const MinuteDiff = weatherInfo.sunset === undefined ? 0 : (weatherInfo.sunset.split(":")[1] - weatherInfo.sunrise.split(":")[1]).toString()
    const date = new Date()
    const currentHour = date.getHours().toString()
    const currentMinute = date.getMinutes().toString().length === 1 ? "0" + date.getMinutes().toString() : date.getMinutes().toString()
    const sunriseHour = weatherInfo.sunrise.split(":")[0].toString()
    const sunriseMinute = weatherInfo.sunrise.split(":")[1].toString()
    const sunsetHour = weatherInfo.sunset.split(":")[0].toString()
    const sunsetMinute = weatherInfo.sunset.split(":")[1].toString()

    // const sunriseMinute = weatherInfo.sunset > 0 && weatherInfo.sunset.split(":")[1]
    //
    // const TimeProcess = (358 / parseInt(HourDiff + MinuteDiff)) * (parseInt(HourDiff + MinuteDiff) - parseInt(currentHour + currentMinute))
    // // // console.log(TimeProcess)
    const CurrentDiff = () => {}

    const isLateTime = (date1, date2) => {
        return date1.getTime() > date2.getTime()
    }

    let date1 = new Date().setTime(weatherInfo.sunset)

    const YellowWidth = () => {
        // 1. 일몰 - 일출
        const diff = parseInt(sunsetHour + sunsetMinute) - parseInt(sunriseHour + sunriseMinute)
        // 2. 한 칸 당 면적 몫
        const share = Math.round((358 / diff) * 10) / 10
        // 3. 한 칸 당 면적 나머지
        const remainder = Math.round((358 - diff * share) * 10) / 10
        // 4. 현재시간 - 일출
        const tempSize = parseInt(currentHour + currentMinute) - parseInt(sunriseHour + sunriseMinute)
        // 5. 노란색 width
        return tempSize * share + remainder
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
                            marginTop: 20
                        }
                    ]}
                >
                    {/*TODO*/}
                    {/*<View*/}
                    {/*    style={{*/}
                    {/*        width: YellowWidth(),*/}
                    {/*        height: 2,*/}
                    {/*        backgroundColor: CurrentDiff() === "SunriseFirst" ? CommonColor.sun_yellow : CommonColor.moon_yellow*/}
                    {/*    }}*/}
                    {/*>*/}
                    {/*    {CurrentDiff() === "SunriseFirst" ? <Sun width={24} height={24} bottom={10} left={YellowWidth()} /> : <Moon width={24} height={24} bottom={10} left={YellowWidth()} />}*/}
                    {/*    <Text style={[CommonFont.semi_bold_12, { position: "absolute", right: -10, top: 15, color: CommonColor.sun_yellow }]}>*/}
                    {/*        {currentHour}:{currentMinute}*/}
                    {/*    </Text>*/}
                    {/*</View>*/}
                </View>
                <View style={{ width: "100%", justifyContent: "space-between", flexDirection: "row", alignItems: "center", paddingHorizontal: 20, marginTop: 10 }}>
                    <View style={{ alignItems: "center" }}>
                        <Text style={[CommonFont.semi_bold_12, { color: CommonColor.main_white }]}>{CurrentDiff() === "SunriseFirst" ? "일출" : "일몰"}</Text>
                        <Text style={[CommonFont.semi_bold_12, { color: CommonColor.main_white }]}>{CurrentDiff() === "SunriseFirst" ? weatherInfo.sunrise : weatherInfo.sunset}</Text>
                    </View>
                    <View style={{ alignItems: "center" }}>
                        <Text style={[CommonFont.semi_bold_12, { color: CommonColor.main_white }]}>{CurrentDiff() === "SunriseFirst" ? "일몰" : "일출"}</Text>
                        <Text style={[CommonFont.semi_bold_12, { color: CommonColor.main_white }]}>{CurrentDiff() === "SunriseFirst" ? weatherInfo.sunset : weatherInfo.sunrise}</Text>
                    </View>
                </View>
                <View style={{ marginHorizontal: 20, marginTop: 16 }}>
                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                        <View>
                            <Text style={[CommonFont.semi_bold_26, TextShadowStyle, { color: CommonColor.main_white }]}>체감온도가 {weatherInfo.feelsLike}˚예요.</Text>
                            <Text style={[CommonFont.semi_bold_26, TextShadowStyle, { marginTop: 6, color: CommonColor.main_white }]}>감기 조심하세요!</Text>
                        </View>
                        <Text style={[CommonFont.semi_bold_35, TextShadowStyle, { color: CommonColor.main_white, fontSize: 66 }]}>{weatherInfo.currentTemp}˚</Text>
                    </View>
                    <View style={{ marginTop: 8, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                        <Text style={[CommonFont.regular_14, { color: CommonColor.main_white }]}>
                            {myLocationArray[0].location} | {DateFormat()}
                        </Text>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <HighTemp width={12} height={12} />
                            <Text style={[CommonFont.regular_14, { marginLeft: 10, color: CommonColor.main_white }]}>{weatherInfo.highTemp}˚</Text>
                            <Text style={[CommonFont.regular_14, { marginHorizontal: 10, color: CommonColor.main_white }]}>|</Text>
                            <LowTemp width={12} height={12} />
                            <Text style={[CommonFont.regular_14, { marginLeft: 10, color: CommonColor.main_white }]}>{weatherInfo.lowTemp}˚</Text>
                        </View>
                    </View>
                    <View style={{ marginTop: 32, flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between" }}>
                        <Girl />
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
