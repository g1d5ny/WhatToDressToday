import React from "react"
import { View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native"
import { DailyWeather, TopAppBar, WeatherCard } from "../../../component/ItemComponent"

/**
 * @dates 2022-08-14
 * @author jw
 * @description 일기 예보 상세 presenter
 */
const WeatherDetailPresenter = ({ navigation, currentWeatherInfo, myLocationArray, weekWeatherInfo }) => {
    const month = new Date().getMonth() + 1
    const date = new Date().getDate()

    const dayFormat = {
        0: "일",
        1: "월",
        2: "화",
        3: "수",
        4: "목",
        5: "금",
        6: "토"
    }

    return (
        <View style={{ flex: 1, backgroundColor: "#fff" }}>
            <TopAppBar title={"일기 예보 상세"} onPress={() => navigation.goBack()} hasLine={true} />
            <ScrollView>
                <View style={{ marginTop: 24, marginHorizontal: 16 }}>
                    <WeatherCard
                        icon={weekWeatherInfo[0].icon}
                        month={month}
                        date={date}
                        location={myLocationArray[0].location}
                        min={weekWeatherInfo[0].min}
                        max={weekWeatherInfo[0].max}
                        humidity={weekWeatherInfo[0].humidity}
                        wind={weekWeatherInfo[0].wind}
                    />
                    {weekWeatherInfo.map(({ max, min, icon, date, day }, index) => {
                        if (index === 0) return
                        return (
                            <View key={index}>
                                <DailyWeather max={max} min={min} icon={icon} date={date} day={dayFormat[day]} />
                            </View>
                        )
                    })}
                </View>
            </ScrollView>
        </View>
    )
}
export default WeatherDetailPresenter
