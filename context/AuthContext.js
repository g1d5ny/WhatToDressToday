import React, { createContext, useState } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import _ from "loadsh"

export const AuthContext = createContext()

export const AuthProvider = ({ isLoggedIn: isLoggedInProp, skinColor: skinColorProp, gender: genderProp, nickname: nicknameProp, myLocationArray: myLocationArrayProp, children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(isLoggedInProp)
    const [skinColor, setSkinColor] = useState(skinColorProp)
    const [gender, setGender] = useState(genderProp)
    const [nickname, setNickname] = useState(nicknameProp)
    const [myLocationArray, setMyLocationArray] = useState(myLocationArrayProp)

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

    return <AuthContext.Provider value={{ isLoggedIn, skinColor, gender, nickname, myLocationArray, logUserIn, AddMyLocation, DeleteMyLocation }}>{children}</AuthContext.Provider>
}
