import React, { useContext } from "react"
import WeatherDetailPresenter from "./WeatherDetailPresenter"
import { AuthContext } from "../../../context/AuthContext"

/**
 * @dates 2022-08-14
 * @author jw
 * @description 일기 예보 상세 container
 */
const WeatherDetailContainer = ({ route }) => {
    const { myLocationArray } = useContext(AuthContext)
    const currentWeatherInfo = route.params.currentWeatherInfo
    const weekWeatherInfo = route.params.weekWeatherInfo

    return <WeatherDetailPresenter myLocationArray={myLocationArray} currentWeatherInfo={currentWeatherInfo} weekWeatherInfo={weekWeatherInfo} />
}
export default WeatherDetailContainer
