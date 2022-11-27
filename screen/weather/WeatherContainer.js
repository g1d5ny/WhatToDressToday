import React, { useContext, useEffect, useState } from "react"
import WeatherPresenter from "./WeatherPresenter"
import { AuthContext } from "../../context/AuthContext"
import { CurrentWeatherFunction, HourWeatherFunction, WeekWeatherFunction } from "../../function/weather/WeatherFunction"
import Loader from "../../component/lottieComponent/Loader"

/**
 * @dates 2022-08-14
 * @author jw
 * @description
 */
const WeatherContainer = ({ navigation }) => {
    const { myLocationArray } = useContext(AuthContext)
    const [currentWeatherInfo, setCurrentWeatherInfo] = useState()
    const [weekWeatherInfo, setWeekWeatherInfo] = useState([])
    const [hourWeatherInfo, setHourWeatherInfo] = useState([])

    useEffect(() => {
        CurrentWeatherFunction(myLocationArray[0].coordinate.latitude, myLocationArray[0].coordinate.longitude, setCurrentWeatherInfo)
        WeekWeatherFunction(myLocationArray[0].coordinate.latitude, myLocationArray[0].coordinate.longitude, setWeekWeatherInfo)
        HourWeatherFunction(myLocationArray[0].coordinate.latitude, myLocationArray[0].coordinate.longitude, setHourWeatherInfo)
    }, [myLocationArray])

    //TODO AppChange foreground -> background refresh -_-

    // 일출 - 일몰 / 일몰 - 담날 일출 기준

    return currentWeatherInfo === undefined || weekWeatherInfo.length === 0 || hourWeatherInfo.length === 0 ? (
        <Loader />
    ) : (
        <WeatherPresenter navigation={navigation} currentWeatherInfo={currentWeatherInfo} weekWeatherInfo={weekWeatherInfo} hourWeatherInfo={hourWeatherInfo} myLocationArray={myLocationArray} />
    )
}
export default WeatherContainer
