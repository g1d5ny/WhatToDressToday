import React, { createContext, useState } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import _ from "loadsh"

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

    const logUserIn = async (skinColor, gender, nickname, myLocation) => {
        try {
            setSkinColor(skinColor)
            await AsyncStorage.setItem("skinColor", skinColor.toString())

            setGender(gender)
            await AsyncStorage.setItem("gender", gender.toString())

            setNickname(nickname)
            await AsyncStorage.setItem("nickname", nickname.toString())

            await AddMyLocation(myLocation)

            // await SetMyAge(age)

            // await SetProfileBgColor(profileBgColor)

            setIsLoggedIn(true)
            await AsyncStorage.setItem("isLoggedIn", "true")
        } catch (e) {
            console.error(e)
        }
    }

    const AddMyLocation = async value => {
        let list = [...myLocationArray]
        list.unshift(value)
        const newList = _.uniqBy(list, "location")

        setMyLocationArray(newList)
        await AsyncStorage.setItem("myLocationArray", JSON.stringify(newList))
    }

    const DeleteMyLocation = async index => {
        let list = [...myLocationArray]
        list.splice(index, 1)
        setMyLocationArray(list)
        await AsyncStorage.setItem("myLocationArray", JSON.stringify(list))
    }

    const SetMyAge = async value => {
        setAge(value)
        await AsyncStorage.setItem("age", value.toString())
    }

    const SetMyNickname = async value => {
        setNickname(value)
        await AsyncStorage.setItem("nickname", value.toString())
    }

    const SetMyGender = async value => {
        setGender(value)
        await AsyncStorage.setItem("gender", value.toString())
    }

    const SetRecommendClothesPrefer = async value => {
        setRecommendClothesPrefer(value)
        await AsyncStorage.setItem("recommendClothesPrefer", recommendClothesPrefer.toString())
    }

    const SetWeatherBgPrefer = async value => {
        setWeatherBgPrefer(value)
        await AsyncStorage.setItem("weatherBgPrefer", weatherBgPrefer.toString())
    }

    const SetProfileBgColor = async value => {
        setProfileBgColor(value)
        await AsyncStorage.setItem("profileBgColor", value.toString())
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
                profileBgColor,
                logUserIn,
                AddMyLocation,
                DeleteMyLocation,
                SetMyAge,
                SetProfileBgColor,
                SetMyGender,
                SetMyNickname,
                SetRecommendClothesPrefer,
                SetWeatherBgPrefer
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}
