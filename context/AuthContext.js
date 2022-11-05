import React, { createContext, useState } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"

export const AuthContext = createContext()

export const AuthProvider = ({ isLoggedIn: isLoggedInProp, skinColor: skinColorProp, gender: genderProp, nickname: nicknameProp, myLocationArray: myLocationArrayProp, children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(isLoggedInProp)
    const [skinColor, setSkinColor] = useState(skinColorProp)
    const [gender, setGender] = useState(genderProp)
    const [nickname, setNickname] = useState(nicknameProp)
    const [myLocationArray, setMyLocationArray] = useState(myLocationArrayProp)

    const logUserIn = async (skinColor, gender, nickname, myLocation) => {
        try {
            setIsLoggedIn(true)
            await AsyncStorage.setItem("isLoggedIn", "true")

            setSkinColor(skinColor)
            await AsyncStorage.setItem("skinColor", skinColor.toString())

            setGender(gender)
            await AsyncStorage.setItem("gender", gender.toString())

            setNickname(nickname)
            await AsyncStorage.setItem("nickname", nickname.toString())

            const list = myLocationArray.unshift(myLocation)
            setMyLocationArray(list)
            await AsyncStorage.setItem("myLocationArray", JSON.stringify(list))
        } catch (e) {
            console.error(e)
        }
    }

    const AddMyLocation = async value => {
        let list = [...myLocationArray]
        list.unshift(value)
        setMyLocationArray(list)
        await AsyncStorage.setItem("myLocationArray", JSON.stringify(list))
    }

    const DeleteMyLocation = async index => {
        let list = [...myLocationArray]
        list.splice(index, 1)
        setMyLocationArray(list)
        await AsyncStorage.setItem("myLocationArray", JSON.stringify(list))
    }

    return <AuthContext.Provider value={{ isLoggedIn, skinColor, gender, nickname, myLocationArray, logUserIn, AddMyLocation, DeleteMyLocation }}>{children}</AuthContext.Provider>
}
