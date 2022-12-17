import React from "react"
import { View, Text, TextInput, TouchableOpacity, ImageBackground, StyleSheet } from "react-native"
import { screenHeight } from "../../../style/DimentStyle"
import { CommonColor, CommonFont, ShadowStyle, TextShadowStyle } from "../../../text/CommonStyle"
import Sun from "../../../asset/icon/sunny.svg"
import Moon from "../../../asset/icon/moon.svg"
import HighTemp from "../../../asset/icon/temperature_high.svg"
import LowTemp from "../../../asset/icon/temperature_low.svg"
import Girl from "../../../asset/icon/3d_girl.svg"
import Clothes from "../../../asset/icon/3d_clothes.svg"
import Pants from "../../../asset/icon/3d_pants.svg"

/**
 * @dates 2022-12-18
 * @author jw
 * @description Main Background
 */
const MainBackground = ({ yesterdaySunset, currentWeatherInfo, weekWeatherInfo, myLocationArray }) => {
    // 일출 - 일몰 / 일몰 - 담날 일출 기준
    // 1. 일출 - 일몰
    const isSunRiseFirst = () => {
        if (new Date().getTime() > currentWeatherInfo.sunriseEpoch && new Date().getTime() <= currentWeatherInfo.sunriseEpoch) {
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
        if (isSunRiseFirst() === "일출") {
            diff = currentWeatherInfo.sunsetEpoch - currentWeatherInfo.sunriseEpoch
        }
        // 일몰 - 일출
        else {
            // 1. 전날 일몰 - 오늘 일출
            if (currentWeatherInfo.sunriseEpoch >= new Date().getTime()) {
                diff = currentWeatherInfo.sunriseEpoch - yesterdaySunset.sunsetEpoch
            }
            // 2. 오늘 일몰 - 담날 일출
            else {
                diff = weekWeatherInfo[1].sunriseEpoch - currentWeatherInfo.sunsetEpoch
            }
        }

        // 2. 현재 시간 UnixTime
        const todayUnixTime = new Date().getTime()

        // 3. 이동 거리
        let distance = 0
        // 일출 - 일몰
        if (isSunRiseFirst() === "일출") {
            distance = todayUnixTime - currentWeatherInfo.sunriseEpoch
        }
        // 일몰 - 일출
        else {
            // 1. 전날 일몰 - 오늘 일출
            if (currentWeatherInfo.sunriseEpoch >= new Date().getTime()) {
                distance = todayUnixTime - yesterdaySunset.sunsetEpoch
            }
            // 2. 오늘 일몰 - 담날 일출
            else {
                distance = todayUnixTime - currentWeatherInfo.sunsetEpoch
            }
        }

        // 4. 백분율 구하기
        return Math.round((distance / diff) * 100)
    }

    return (
        <View style={{ flex: 1, backgroundColor: "#fff" }}>
            <ImageBackground source={require("../../../asset/image/background_temp.png")} resizeMode='cover' style={{ width: "100%", height: screenHeight }}>
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
                    <View
                        style={{
                            width: DistanceFunction() + "%",
                            height: 2,
                            backgroundColor: isSunRiseFirst() === "일출" ? CommonColor.sun_yellow : CommonColor.moon_yellow
                        }}
                    />
                    <View style={{ marginLeft: DistanceFunction() + "%", left: -12, bottom: 10 }}>
                        {isSunRiseFirst() === "일출" ? <Sun width={24} height={24} /> : <Moon width={24} height={24} />}
                        <Text style={[CommonFont.semi_bold_12, { color: isSunRiseFirst() === "일출" ? CommonColor.sun_yellow : CommonColor.moon_yellow }]}>
                            {new Date().getHours().toString().padStart(2, "0")}:{new Date().getMinutes().toString().padStart(2, "0")}
                        </Text>
                    </View>
                </View>
                <View style={styles.textView}>
                    <View style={{ alignItems: "center" }}>
                        <Text style={styles.text}>{isSunRiseFirst() === "일출" ? "일출" : "일몰"}</Text>
                        <Text style={styles.text}>{isSunRiseFirst() === "일출" ? currentWeatherInfo.sunrise.slice(":", -3) : yesterdaySunset.sunset.slice(":", -3)}</Text>
                    </View>
                    <View style={{ alignItems: "center" }}>
                        <Text style={styles.text}>{isSunRiseFirst() === "일출" ? "일몰" : "일출"}</Text>
                        <Text style={styles.text}>{isSunRiseFirst() === "일출" ? currentWeatherInfo.sunset.slice(":", -3) : weekWeatherInfo[1].sunrise.slice(":", -3)}</Text>
                    </View>
                </View>
                <View style={styles.backgroundView}>
                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                        <View style={{ width: "70%" }}>
                            <Text style={styles.weatherExplanation}>체감온도가 {currentWeatherInfo.feelsLike}˚예요.</Text>
                            {/*<Text style={[styles.weatherExplanation, { marginTop: 6 }]}>감기 조심하세요!</Text>*/}
                            <Text style={[styles.weatherExplanation, { marginTop: 6 }]}>{currentWeatherInfo.description}</Text>
                        </View>
                        <Text
                            style={[
                                CommonFont.semi_bold_35,
                                TextShadowStyle,
                                {
                                    color: CommonColor.main_white,
                                    fontSize: 66
                                }
                            ]}
                        >
                            {currentWeatherInfo.currentTemp}˚
                        </Text>
                    </View>
                    <View style={styles.info}>
                        <Text style={[CommonFont.regular_14, { color: CommonColor.main_white }]}>{myLocationArray[0].location}</Text>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <HighTemp width={12} height={12} />
                            <Text style={[styles.temperatureText, { marginLeft: 10 }]}>{currentWeatherInfo.max}˚</Text>
                            <Text style={[styles.temperatureText, { marginHorizontal: 10 }]}>|</Text>
                            <LowTemp width={12} height={12} />
                            <Text
                                style={[
                                    CommonFont.regular_14,
                                    {
                                        marginLeft: 10,
                                        color: CommonColor.main_white
                                    }
                                ]}
                            >
                                {currentWeatherInfo.min}˚
                            </Text>
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
        </View>
    )
}

// prettier-ignore
const styles = StyleSheet.create({
    text: [
        CommonFont.semi_bold_12, {
            color: CommonColor.main_white,
        }],
    textView: {
        width: "100%",
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
        marginTop: 10,
    },
    backgroundView: {
        marginHorizontal: 16,
        marginTop: 16,
    },
    weatherExplanation: [
        CommonFont.semi_bold_26,
        TextShadowStyle, {
            color: CommonColor.main_white,
        }],
    info: {
        marginTop: 8,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    costumeView: {
        marginTop: 32,
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "space-between",
    },
    recommendBackground: [
        ShadowStyle,
        {
            width: 136,
            height: 186,
            backgroundColor: "rgba(255, 255, 255, 0.75)",
            marginTop: 12,
            borderRadius: 10,
            justifyContent: "space-between",
        }],
    recommendText: {
        padding: 9,
        backgroundColor: CommonColor.main_white,
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
    },
    temperatureText: [
        CommonFont.regular_14, {
            color: CommonColor.main_white,
        }],
    timeForeCaseView: {
        marginTop: 40,
        paddingHorizontal: 16,
    },
});

export default MainBackground
