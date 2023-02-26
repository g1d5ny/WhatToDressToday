import React from "react"
import { Linking, Platform, Alert, Text, TouchableOpacity } from "react-native"
import { PERMISSIONS, request, requestMultiple } from "react-native-permissions"

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

export const CheckOnlyNotificationPermission = async () => {
    try {
        if (Platform.OS === "android") {
            const statuses = await request([PERMISSIONS.ANDROID.POST_NOTIFICATIONS])
            return statuses[PERMISSIONS.ANDROID.POST_NOTIFICATIONS] === "granted"
        } else {
            const statuses = await request([PERMISSIONS.IOS.POST_NOTIFICATIONS])
            return statuses[PERMISSIONS.IOS.POST_NOTIFICATIONS] === "granted"
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

export const DateTimeToUnixTime = t => {
    return Math.floor(new Date(t).getTime() / 1000)
}

/**
 * @dates 2022-12-15
 * @author jw
 * @description 화씨 섭씨로 변환하는 함수
 */
export const FahrenheitToCelsius = temp => {
    return Math.floor(((temp - 32) * 5) / 9)
}
