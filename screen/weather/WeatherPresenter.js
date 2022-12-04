import React from "react"
import { ImageBackground, ScrollView, Text, View, StyleSheet, TouchableOpacity } from "react-native"
import { screenHeight } from "../../style/DimentStyle"
import { CommonColor, CommonFont, ShadowStyle, TextShadowStyle } from "../../text/CommonStyle"
import HighTemp from "../../asset/icon/temperature_high.svg"
import LowTemp from "../../asset/icon/temperature_low.svg"
import Sun from "../../asset/icon/sunny.svg"
import Moon from "../../asset/icon/moon.svg"
import Girl from "../../asset/icon/3d_girl.svg"
import Clothes from "../../asset/icon/3d_clothes.svg"
import Pants from "../../asset/icon/3d_pants.svg"
import Thunderstorm from "../../asset/icon/thunderstorm.svg"
import Shower from "../../asset/icon/shower_rain.svg"
import Rain from "../../asset/icon/rain.svg"
import Snow from "../../asset/icon/snow.svg"
import LightSnow from "../../asset/icon/light_snow.svg"
import Mist from "../../asset/icon/mist.svg"
import ScatteredClouds from "../../asset/icon/scattered_cloudy.svg"
import FewClouds from "../../asset/icon/few_clouds.svg"
import BrokenClouds from "../../asset/icon/broken_clouds.svg"
import { DateFormat, DateTimeToUnixTime, UnixTimeToDateTime } from "../../function/common/CommonFunction"

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

    const CurrentTimeVisible = () => {
        const left = SunRiseSetFunction() === "일출" ? currentWeatherInfo.sunrise : currentWeatherInfo.sunset
        const right = SunRiseSetFunction() === "일출" ? currentWeatherInfo.sunset : weekWeatherInfo[1].sunrise
        const current = DateTimeToUnixTime(new Date())
        console.log("visible: ", current, left)
        return current >= left + 30 && current <= right - 30
    }

    const HourlyWeatherView = ({ id, time, description, temp, index }) => {
        const idValue = id.toString()
        const hour = time.split(" ")[1].split(":")[0]

        const Icon = () => {
            if (idValue.startsWith(2)) return <Thunderstorm />
            if (idValue.startsWith(3)) return <Shower />
            if (idValue.startsWith(5)) return <Rain />
            if (idValue.startsWith(6)) {
                if (description === "light_snow") return <LightSnow />
                return <Snow />
            }
            if (idValue.startsWith(7)) return <Mist />
            if (idValue.startsWith(8)) {
                if (id === 800) {
                    if (hour === "06" || hour === "09" || hour === "12" || hour === "15") return <Sun />
                    return <Moon />
                } else {
                    if (description === "scattered clouds") return <ScatteredClouds />
                    if (description === "few clouds") return <FewClouds />
                    return <BrokenClouds />
                }
            }
        }

        return (
            <TouchableOpacity style={{ width: 40, borderRadius: 10, backgroundColor: index === 0 ? CommonColor.label_background_blue : "transparent", justifyContent: "space-evenly", paddingVertical: 9, alignItems: "center" }}>
                <Text style={index === 0 ? [CommonFont.semi_bold_14, { color: CommonColor.main_blue, marginBottom: 9 }] : [CommonFont.regular_14, { marginBottom: 9 }]}>{hour}시</Text>
                <Icon />
                <Text style={[CommonFont.semi_bold_16, { color: index === 0 ? CommonColor.main_blue : CommonColor.basic_black, marginTop: 9 }]}>{temp}˚</Text>
            </TouchableOpacity>
        )
    }

    return (
        <ScrollView style={{ flex: 1, backgroundColor: "#fff" }}>
            <ImageBackground source={require("../../asset/image/background_temp.png")} resizeMode='cover' style={{ width: "100%", height: screenHeight }}>
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
                        {/*{CurrentTimeVisible() && (*/}
                        {/*    <Text style={[CommonFont.semi_bold_12, { color: SunRiseSetFunction() === "일출" ? CommonColor.sun_yellow : CommonColor.moon_yellow }]}>*/}
                        {/*        {new Date().getHours()}:{new Date().getMinutes()}*/}
                        {/*    </Text>*/}
                        {/*)}*/}
                    </View>
                </View>
                <View style={styles.textView}>
                    <View style={{ alignItems: "center" }}>
                        <Text style={styles.text}>{SunRiseSetFunction() === "일출" ? "일출" : "일몰"}</Text>
                        <Text style={styles.text}>{SunRiseSetFunction() === "일출" ? UnixTimeToDateTime(currentWeatherInfo.sunrise) : UnixTimeToDateTime(currentWeatherInfo.sunset)}</Text>
                    </View>
                    <View style={{ alignItems: "center" }}>
                        <Text style={styles.text}>{SunRiseSetFunction() === "일출" ? "일몰" : "일출"}</Text>
                        <Text style={styles.text}>{SunRiseSetFunction() === "일출" ? UnixTimeToDateTime(currentWeatherInfo.sunset) : UnixTimeToDateTime(weekWeatherInfo[1].sunrise)}</Text>
                    </View>
                </View>
                <View style={styles.backgroundView}>
                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                        <View>
                            <Text style={styles.weatherExplanation}>체감온도가 {currentWeatherInfo.feelsLike}˚예요.</Text>
                            <Text style={[styles.weatherExplanation, { marginTop: 6 }]}>감기 조심하세요!</Text>
                        </View>
                        <Text style={[CommonFont.semi_bold_35, TextShadowStyle, { color: CommonColor.main_white, fontSize: 66 }]}>{currentWeatherInfo.currentTemp}˚</Text>
                    </View>
                    <View style={styles.info}>
                        <Text style={[CommonFont.regular_14, { color: CommonColor.main_white }]}>{myLocationArray[0].location}</Text>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <HighTemp width={12} height={12} />
                            <Text style={[styles.temperatureText, { marginLeft: 10 }]}>{currentWeatherInfo.max}˚</Text>
                            <Text style={[styles.temperatureText, { marginHorizontal: 10 }]}>|</Text>
                            <LowTemp width={12} height={12} />
                            <Text style={[CommonFont.regular_14, { marginLeft: 10, color: CommonColor.main_white }]}>{currentWeatherInfo.min}˚</Text>
                        </View>
                    </View>
                    <View style={styles.costumeView}>
                        <Girl />
                        <View>
                            <Text style={[CommonFont.semi_bold_16, { marginRight: 20, color: CommonColor.main_white }]}>기온 맞춤 추천 의상</Text>
                            <View style={styles.recommendBackground}>
                                <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                                    <Clothes />
                                </View>
                                <View style={styles.recommendText}>
                                    <Text style={[CommonFont.semi_bold_16, { color: CommonColor.main_blue, marginBottom: 4 }]}>반팔</Text>
                                    <Text style={[CommonFont.regular_12, CommonColor.basic_gray_dark]}>소매가 짧은 상의</Text>
                                </View>
                            </View>
                            <View style={styles.recommendBackground}>
                                <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                                    <Pants />
                                </View>
                                <View style={styles.recommendText}>
                                    <Text style={[CommonFont.semi_bold_16, { color: CommonColor.main_blue, marginBottom: 4 }]}>반바지</Text>
                                    <Text style={[CommonFont.regular_12, CommonColor.basic_gray_dark]}>소매가 짧은 하의</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </ImageBackground>
            <View style={styles.timeForeCaseView}>
                <Text style={[CommonFont.semi_bold_18, { marginBottom: 20 }]}>시간대별 일기 예보</Text>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    {hourWeatherInfo.map(({ time, temp, description, id }, index) => {
                        return (
                            <View key={index} style={{ marginRight: 12 }}>
                                <HourlyWeatherView id={id} time={time} temp={temp} description={description} index={index} />
                            </View>
                        )
                    })}
                </ScrollView>
            </View>
        </ScrollView>
    )
}

// prettier-ignore
const styles = StyleSheet.create({
    text: [
      CommonFont.semi_bold_12, {
        color: CommonColor.main_white
    }],
    textView: {
        width: "100%",
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
        marginTop: 10
    },
    backgroundView: {
        marginHorizontal: 16,
        marginTop: 16,
    },
    weatherExplanation: [
      CommonFont.semi_bold_26,
      TextShadowStyle, {
        color: CommonColor.main_white
    }],
    info: {
        marginTop: 8,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    costumeView: {
        marginTop: 32,
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "space-between"
    },
    recommendBackground:[
      ShadowStyle,
      { width: 136,
        height: 186,
        backgroundColor: "rgba(255, 255, 255, 0.75)",
        marginTop: 12,
        borderRadius: 10,
        justifyContent: 'space-between',
      }],
    recommendText: {
        padding: 9,
        backgroundColor: CommonColor.main_white,
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10
    },
    temperatureText: [
        CommonFont.regular_14, {
        color: CommonColor.main_white
    }],
    timeForeCaseView: {
        marginTop: 40,
        paddingHorizontal: 16,
    }
})

export default WeatherPresenter
