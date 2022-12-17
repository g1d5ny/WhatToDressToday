import React, { useCallback } from "react"
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
import Mist from "../../asset/icon/mist.svg"
import CloudyDay from "../../asset/icon/cloudy-day.svg"
import PartyCloudyDay from "../../asset/icon/pary_cloudy_day.svg"
import PartyCloudyNight from "../../asset/icon/pary_cloudy_night.svg"
import CloudyNight from "../../asset/icon/cloudy-night.svg"
import Sunset from "../../asset/icon/sunset.svg"
import Sunrise from "../../asset/icon/sunrise.svg"
import { DateFormat, DateTimeToUnixTime, FahrenheitToCelsius, UnixTimeToDateTime } from "../../function/common/CommonFunction"
import MainBackgroundScreen from "./main/MainBackgroundScreen"

/**
 * @dates 2022-08-14
 * @author jw
 * @description
 */
const WeatherPresenter = ({ navigation, yesterdaySunset, currentWeatherInfo, weekWeatherInfo, hourWeatherInfo, myLocationArray }) => {
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
                <View
                    style={{
                        backgroundColor: index === 0 && CommonColor.basic_gray_light,
                        borderRadius: 10,
                        justifyContent: "space-evenly",
                        paddingVertical: 9,
                        alignItems: "center"
                    }}
                >
                    <Text style={[index === 0 ? CommonFont.semi_bold_14 : CommonFont.regular_14, { color: index === 0 && CommonColor.main_blue, marginBottom: 9 }]}>{index === 0 ? "지금 " : hour + "시"}</Text>
                    {Icon[icon]}
                    <Text style={[CommonFont.semi_bold_16, { color: index === 0 && CommonColor.main_blue, marginTop: 9 }]}>{temp}˚</Text>
                </View>
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
        <ScrollView style={{ flex: 1, backgroundColor: "#fff" }}>
            <MainBackgroundScreen currentWeatherInfo={currentWeatherInfo} weekWeatherInfo={weekWeatherInfo} yesterdaySunset={yesterdaySunset} myLocationArray={myLocationArray} />
            <View style={styles.timeForeCaseView}>
                <Text style={[CommonFont.semi_bold_18, { marginBottom: 20 }]}>시간대별 일기 예보</Text>
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
            <View style={{ width: "100%", height: 8, backgroundColor: CommonColor.basic_gray_light, marginVertical: 28 }} />
        </ScrollView>
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

export default WeatherPresenter
