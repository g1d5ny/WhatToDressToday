import React, { forwardRef, useRef, useState } from "react"
import { ScrollView, Text, View, StyleSheet, TouchableOpacity } from "react-native"
import { CommonColor, CommonFont, ShadowStyle } from "../../text/CommonStyle"
import Sun from "../../asset/icon/sunny.svg"
import Moon from "../../asset/icon/moon.svg"
import Rain from "../../asset/icon/rain.svg"
import Snow from "../../asset/icon/snow.svg"
import CloudyDay from "../../asset/icon/cloudy-day.svg"
import PartyCloudyDay from "../../asset/icon/pary_cloudy_day.svg"
import PartyCloudyNight from "../../asset/icon/pary_cloudy_night.svg"
import CloudyNight from "../../asset/icon/cloudy-night.svg"
import Sunset from "../../asset/icon/sunset.svg"
import Sunrise from "../../asset/icon/sunrise.svg"
import TShirt from "../../asset/icon/clothes_tshirt_blue.svg"
import LongPants from "../../asset/icon/clothes_long_pants_blue.svg"
import ShortPants from "../../asset/icon/clothes_shorts_blue.svg"
import UpArrow from "../../asset/icon/up_arrow_darkgray.svg"
import MainBackgroundScreen from "./main/MainBackgroundScreen"
import { CardComponent, Chips } from "../../component/ItemComponent"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs"
import { screenHeight } from "../../style/DimentStyle"

/**
 * @dates 2022-08-14
 * @author jw
 * @description
 */
const WeatherPresenter = ({ navigation, yesterdaySunset, currentWeatherInfo, weekWeatherInfo, hourWeatherInfo, myLocationArray }) => {
    const ref = useRef()
    const [selectedTemp, setSelectedTemp] = useState()
    const [arrow, setArrow] = useState("down")

    const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
        return layoutMeasurement.height + contentOffset.y >= contentSize.height
    }

    const isCloseToTop = ({ layoutMeasurement, contentOffset, contentSize }) => {
        return layoutMeasurement.height + contentOffset.y < contentSize.height
    }

    const HourlyWeatherView = ({ datetime, icon, temp, index }) => {
        const hour = parseInt(datetime.split(":")[0])
        const sunriseHour = parseInt(currentWeatherInfo.sunrise.split(":")[0])
        const sunriseMinute = parseInt(currentWeatherInfo.sunrise.split(":")[1])
        const sunsetHour = parseInt(currentWeatherInfo.sunset.split(":")[0])
        const sunsetMinute = parseInt(currentWeatherInfo.sunset.split(":")[1])

        const isDawn = hour <= sunriseHour
        const isAfternoon = hour >= sunsetHour

        const Icon = {
            snow: <Snow />,
            rain: <Rain />,
            // fog: <Cloudy />,
            cloudy: isDawn || isAfternoon ? <CloudyNight /> : <CloudyDay />,
            "partly-cloudy-day": <PartyCloudyDay />,
            "partly-cloudy-night": <PartyCloudyNight />,
            "clear-day": <Sun />,
            "clear-night": <Moon />
        }

        return (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
                <TouchableOpacity
                    style={{
                        backgroundColor: index === 0 && CommonColor.basic_gray_light,
                        borderRadius: 10,
                        justifyContent: "space-evenly",
                        paddingVertical: 9,
                        alignItems: "center"
                    }}
                    onPress={() => setSelectedTemp(temp)}
                >
                    <Text style={[index === 0 ? CommonFont.semi_bold_14 : CommonFont.regular_14, { color: index === 0 && CommonColor.main_blue, marginBottom: 9 }]}>{index === 0 ? "지금 " : hour + "시"}</Text>
                    {Icon[icon]}
                    <Text style={[CommonFont.semi_bold_16, { color: index === 0 && CommonColor.main_blue, marginTop: 9 }]}>{temp}˚</Text>
                </TouchableOpacity>
                {(hour === sunsetHour || hour === sunriseHour) && (
                    <View
                        style={{
                            borderRadius: 10,
                            backgroundColor: index === 0 ? CommonColor.basic_gray_light : CommonColor.basic_gray_light,
                            alignItems: "center",
                            justifyContent: "space-evenly",
                            paddingHorizontal: 7,
                            paddingVertical: 9,
                            marginLeft: 12
                        }}
                    >
                        <Text style={[CommonFont.regular_14, { color: index === 0 && CommonColor.main_blue, marginBottom: 9 }]}>
                            {hour === sunsetHour ? sunsetHour : sunriseHour}시 {hour === sunriseHour ? sunriseMinute : sunsetMinute}분
                        </Text>
                        {hour === sunsetHour ? <Sunset /> : <Sunrise />}
                        <Text style={[CommonFont.semi_bold_16, { color: CommonColor.basic_black, marginTop: 9 }]}>{hour === sunsetHour ? "일몰" : "일출"}</Text>
                    </View>
                )}
            </View>
        )
    }

    return (
        <View style={{ flex: 1, backgroundColor: "#fff" }}>
            <TouchableOpacity
                style={[
                    styles.scroller,
                    {
                        transform: [{ rotate: arrow === "down" ? "180deg" : "0deg" }],
                        bottom: 12,
                        right: 12
                    }
                ]}
                onPress={() => {
                    arrow === "up"
                        ? ref.current.scrollTo({
                              height: 0,
                              animated: true
                          })
                        : ref.current.scrollToEnd({
                              animated: true
                          })
                }}
            >
                <UpArrow />
            </TouchableOpacity>
            <ScrollView
                style={{ flex: 1, backgroundColor: "#fff" }}
                ref={ref}
                onScroll={({ nativeEvent }) => {
                    if (isCloseToBottom(nativeEvent)) {
                        setArrow("up")
                    }
                    if (isCloseToTop(nativeEvent)) {
                        setArrow("down")
                    }
                }}
                scrollEventThrottle={100}
            >
                <MainBackgroundScreen currentWeatherInfo={currentWeatherInfo} weekWeatherInfo={weekWeatherInfo} yesterdaySunset={yesterdaySunset} myLocationArray={myLocationArray} />
                <View style={[styles.view, { marginTop: 40 }]}>
                    <Text style={styles.title}>시간대별 일기 예보</Text>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        {hourWeatherInfo.map(({ datetime, temp, icon }, index) => {
                            return (
                                <View key={index} style={{ marginRight: 12 }}>
                                    <HourlyWeatherView datetime={datetime} temp={temp} icon={icon} index={index} />
                                </View>
                            )
                        })}
                    </ScrollView>
                </View>
                <View style={styles.bar} />
                <View style={styles.view}>
                    <View style={{ flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between" }}>
                        <Text style={[styles.title]}>기온별 옷차림</Text>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <View style={styles.selectedTemp}>
                                <Text style={[CommonFont.regular_12]}>
                                    선택된 기온 <Text style={{ color: CommonColor.main_blue }}> {selectedTemp ?? hourWeatherInfo[0].temp}˚</Text>
                                </Text>
                            </View>
                            <Chips month={currentWeatherInfo.month} />
                        </View>
                    </View>
                    <View style={styles.clothesView}>
                        <TShirt />
                        <View style={{ marginRight: 18 }} />
                        {/*TODO marginRight: 8*/}
                        <CardComponent isMain={false} month={currentWeatherInfo.month} name={"반팔"} />
                    </View>
                    <View style={styles.clothesView}>
                        <ShortPants />
                        <View style={{ marginRight: 18 }} />
                        {/*TODO marginRight: 8*/}
                        <CardComponent isMain={false} month={currentWeatherInfo.month} name={"반팔"} />
                    </View>
                    <View style={styles.clothesView}>
                        <LongPants />
                        <View style={{ marginRight: 18 }} />
                        {/*TODO marginRight: 8*/}
                        <CardComponent isMain={false} month={currentWeatherInfo.month} name={"반팔"} />
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    scroller: [
        ShadowStyle,
        {
            width: 52,
            height: 52,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: CommonColor.basic_gray_medium,
            backgroundColor: CommonColor.main_white,
            position: "absolute",
            zIndex: 10,
            alignItems: "center",
            justifyContent: "center"
        }
    ],
    clothesView: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 24
    },
    selectedTemp: {
        backgroundColor: CommonColor.basic_gray_light,
        borderRadius: 4,
        paddingHorizontal: 7,
        paddingVertical: 2,
        marginRight: 7
    },
    //prettier-ignore
    title: [
      CommonFont.semi_bold_18, {
      marginBottom: 22
    }],
    view: {
        paddingHorizontal: 16
    },
    bar: {
        width: "100%",
        height: 8,
        backgroundColor: CommonColor.basic_gray_light,
        marginVertical: 28
    }
})

export default WeatherPresenter
