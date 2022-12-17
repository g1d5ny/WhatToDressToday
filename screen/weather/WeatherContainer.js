import React, { useContext, useEffect, useState } from "react"
import WeatherPresenter from "./WeatherPresenter"
import { AuthContext } from "../../context/AuthContext"
import { CallAllWeather, CallWeatherFunction, CallYesterdaySunset, CurrentWeatherFunction, HourWeatherFunction, WeatherFunction, WeekWeatherFunction } from "../../function/weather/WeatherFunction"
import Loader from "../../component/lottieComponent/Loader"

/**
 * @dates 2022-08-14
 * @author jw
 * @description
 */
const WeatherContainer = ({ navigation }) => {
    const { myLocationArray } = useContext(AuthContext)
    const latitude = myLocationArray[0].coordinate.latitude
    const longitude = myLocationArray[0].coordinate.longitude

    const [yesterdaySunset, setYesterdaySunset] = useState([])
    const [currentWeatherInfo, setCurrentWeatherInfo] = useState()
    const [hourWeatherInfo, setHourWeatherInfo] = useState([])
    const [weekWeatherInfo, setWeekWeatherInfo] = useState([])

    useEffect(() => {
        CallAllWeather(latitude, longitude, setCurrentWeatherInfo, setHourWeatherInfo, setWeekWeatherInfo)
        CallYesterdaySunset(latitude, longitude, setYesterdaySunset)
    }, [myLocationArray])

    //TODO AppChange foreground -> background refresh -_-

    // 일출 - 일몰 / 일몰 - 담날 일출 기준

    return !currentWeatherInfo || weekWeatherInfo.length === 0 || hourWeatherInfo.length === 0 || yesterdaySunset.length === 0 ? (
        <Loader />
    ) : (
        <WeatherPresenter navigation={navigation} yesterdaySunset={yesterdaySunset} currentWeatherInfo={currentWeatherInfo} weekWeatherInfo={weekWeatherInfo} hourWeatherInfo={hourWeatherInfo} myLocationArray={myLocationArray} />
    )
}
export default WeatherContainer
