import React, { useContext } from "react"
import WeatherDetailPresenter from "./WeatherDetailPresenter"
import { AuthContext } from "../../../context/AuthContext"

/**
 * @dates 2022-08-14
 * @author jw
 * @description 일기 예보 상세 container
 */
const WeatherDetailContainer = ({ navigation, route }) => {
    const { myLocationArray, currentWeatherInfo, weekWeatherInfo } = useContext(AuthContext)

    return <WeatherDetailPresenter navigation={navigation} myLocationArray={myLocationArray} currentWeatherInfo={currentWeatherInfo} weekWeatherInfo={weekWeatherInfo} />
}
export default WeatherDetailContainer
