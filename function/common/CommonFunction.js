import React from "react"
import { Linking, Platform, Alert, Text, TouchableOpacity } from "react-native"
import { PERMISSIONS, requestMultiple } from "react-native-permissions"
const kelvinToCelsius = require("kelvin-to-celsius")

/**
 * @dates 2022-10-02
 * @author jw
 * @description 현위치 권한 허용하는 함수
 * Use 현위치를 사용하는 모든 곳
 */
export const CheckOnlyLocationPermission = async () => {
    try {
        if (Platform.OS === "android") {
            const statuses = await requestMultiple([PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION, PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION])
            return statuses[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION] === "granted" || statuses[PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION] === "granted"
        } else {
            const statuses = await requestMultiple([PERMISSIONS.IOS.LOCATION_WHEN_IN_USE, PERMISSIONS.IOS.LOCATION_ALWAYS])
            return statuses[PERMISSIONS.IOS.LOCATION_WHEN_IN_USE] === "granted" || statuses[PERMISSIONS.IOS.LOCATION_ALWAYS] === "granted"
        }
    } catch (err) {
        console.warn(err)
    }
}

export const DateFormat = () => {
    let year = new Date().getFullYear()
    let month = new Date().getMonth() + 1
    let date = new Date().getDate()

    return year + "년 " + month + "월 " + date + "일"
}

export const SunDateFormat = () => {
    let year = new Date().getFullYear()
    let month = new Date().getMonth() + 1
    let date = new Date().getDate()

    return year + "," + month + "," + date + ","
}

export const UnixTimeToDateTime = t => {
    let date = new Date(t * 1000)
    let hour = "0" + date.getHours()
    let minute = "0" + date.getMinutes()

    return hour.slice(-2) + ":" + minute.slice(-2)
}

export const WeatherFunction = (latitude, longitude, setWeatherInfo) => {
    try {
        const key = "15904c4392a25fceafe9fa2a2824f2c5"
        const xobj = new XMLHttpRequest()
        // https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
        xobj.open("GET", "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&appid=" + key)

        xobj.onreadystatechange = function () {
            if (xobj.readyState !== 4) {
                return
            }
            const jsonResponse = JSON.parse(xobj.response)
            setWeatherInfo({
                sunrise: UnixTimeToDateTime(jsonResponse.current.sunrise),
                sunset: UnixTimeToDateTime(jsonResponse.current.sunset),
                currentTemp: parseInt(kelvinToCelsius(jsonResponse.current.temp)),
                feelsLike: parseInt(kelvinToCelsius(jsonResponse.current.feels_like)),
                highTemp: parseInt(kelvinToCelsius(jsonResponse.daily[0].temp.max)),
                lowTemp: parseInt(kelvinToCelsius(jsonResponse.daily[0].temp.min)),
                description: jsonResponse.daily[0].weather[0].description //  jsonResponse.current.weather[0].description
            })
        }

        xobj.send("")
    } catch (e) {}
}
