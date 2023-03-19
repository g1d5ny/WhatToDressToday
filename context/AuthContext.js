import React, { createContext, useState } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import _ from "lodash"

export const AuthContext = createContext()

export const AuthProvider = ({
    isLoggedIn: isLoggedInProp,
    skinColor: skinColorProp,
    gender: genderProp,
    nickname: nicknameProp,
    myLocationArray: myLocationArrayProp,
    age: ageProp,
    profileBgColor: profileBgColorProp,
    recommendClothesPrefer: recommendClothesPreferProp,
    weatherBgPrefer: weatherBgPreferProp,
    currentWeatherInfo: currentWeatherInfoProp,
    weekWeatherInfo: weekWeatherInfoProp,
    goToWorkPush: goToWorkPushProp,
    leaveWorkPush: leaveWorkPushProp,
    children
}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(isLoggedInProp)
    const [skinColor, setSkinColor] = useState(skinColorProp)
    const [gender, setGender] = useState(genderProp)
    const [nickname, setNickname] = useState(nicknameProp)
    const [myLocationArray, setMyLocationArray] = useState(myLocationArrayProp)
    const [age, setAge] = useState(ageProp)
    const [profileBgColor, setProfileBgColor] = useState(profileBgColorProp)
    const [recommendClothesPrefer, setRecommendClothesPrefer] = useState(recommendClothesPreferProp)
    const [weatherBgPrefer, setWeatherBgPrefer] = useState(weatherBgPreferProp)
    const [currentWeatherInfo, setCurrentWeatherInfo] = useState(currentWeatherInfoProp)
    const [weekWeatherInfo, setWeekWeatherInfo] = useState(weekWeatherInfoProp)
    const [goToWorkPush, setGoToWorkPush] = useState(goToWorkPushProp)
    const [leaveWorkPush, setLeaveWorkPush] = useState(leaveWorkPushProp)

    const logUserIn = async (skinColor, gender, nickname, myLocation) => {
        try {
            setSkinColor(skinColor)
            await AsyncStorage.setItem("skinColor", skinColor.toString())

            setGender(gender)
            await AsyncStorage.setItem("gender", gender.toString())

            setNickname(nickname)
            await AsyncStorage.setItem("nickname", nickname.toString())

            await AddMyLocation(myLocation)

            setIsLoggedIn(true)
            await AsyncStorage.setItem("isLoggedIn", "true")
        } catch (e) {
            console.error(e)
        }
    }

    const AddMyLocation = value => {
        let list = [...myLocationArray]
        list.unshift(value)
        const newList = _.uniqBy(list, "location")

        setMyLocationArray(newList)
        AsyncStorage.setItem("myLocationArray", JSON.stringify(newList))
    }

    const DeleteMyLocation = index => {
        let list = [...myLocationArray]
        list.splice(index, 1)
        setMyLocationArray(list)
        AsyncStorage.setItem("myLocationArray", JSON.stringify(list))
    }

    const SetMyAge = value => {
        setAge(value)
        AsyncStorage.setItem("age", value.toString())
    }

    const SetMyNickname = value => {
        setNickname(value)
        AsyncStorage.setItem("nickname", value.toString())
    }

    const SetMyGender = value => {
        setGender(value)
        AsyncStorage.setItem("gender", value.toString())
    }

    const SetRecommendClothesPrefer = value => {
        setRecommendClothesPrefer(value)
        AsyncStorage.setItem("recommendClothesPrefer", recommendClothesPrefer.toString())
    }

    const SetWeatherBgPrefer = value => {
        setWeatherBgPrefer(value)
        AsyncStorage.setItem("weatherBgPrefer", weatherBgPrefer.toString())
    }

    const SetProfileBgColor = value => {
        setProfileBgColor(value)
        AsyncStorage.setItem("profileBgColor", value.toString())
    }

    const SetCurrentWeatherInfo = value => {
        setCurrentWeatherInfo(value)
        AsyncStorage.setItem("currentWeatherInfo", JSON.stringify(value))
    }

    const SetWeekWeatherInfo = value => {
        setWeekWeatherInfo(value)
        AsyncStorage.setItem("weekWeatherInfo", JSON.stringify(value))
    }

    const SetGoToWorkPush = value => {
        setGoToWorkPush(value)
        AsyncStorage.setItem("goToWorkPush", JSON.stringify(value))
    }

    const SetLeaveWorkPush = value => {
        setLeaveWorkPush(value)
        AsyncStorage.setItem("leaveWorkPush", JSON.stringify(value))
    }

    return (
        <AuthContext.Provider
            value={{
                isLoggedIn,
                skinColor,
                gender,
                nickname,
                myLocationArray,
                age,
                recommendClothesPrefer,
                weatherBgPrefer,
                profileBgColor,
                currentWeatherInfo,
                weekWeatherInfo,
                goToWorkPush,
                leaveWorkPush,
                logUserIn,
                AddMyLocation,
                DeleteMyLocation,
                SetMyAge,
                SetProfileBgColor,
                SetMyGender,
                SetMyNickname,
                SetRecommendClothesPrefer,
                SetWeatherBgPrefer,
                SetCurrentWeatherInfo,
                SetWeekWeatherInfo,
                SetGoToWorkPush,
                SetLeaveWorkPush
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}
