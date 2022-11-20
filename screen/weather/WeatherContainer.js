import React, { useContext, useEffect, useState } from "react"
import WeatherPresenter from "./WeatherPresenter"
import { AuthContext } from "../../context/AuthContext"
import { WeatherFunction } from "../../function/common/CommonFunction"
import Loader from "../../component/lottieComponent/Loader"

/**
 * @dates 2022-08-14
 * @author jw
 * @description
 */
const WeatherContainer = ({ navigation }) => {
    const { myLocationArray } = useContext(AuthContext)
    const [weatherInfo, setWeatherInfo] = useState({})

    useEffect(() => {
        WeatherFunction(myLocationArray[0].coordinate.latitude, myLocationArray[0].coordinate.longitude, setWeatherInfo)
    }, [])

    return weatherInfo.sunrise === undefined ? <Loader /> : <WeatherPresenter navigation={navigation} weatherInfo={weatherInfo} myLocationArray={myLocationArray} />
}
export default WeatherContainer
