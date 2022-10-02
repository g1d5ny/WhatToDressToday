import React, {createContext, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";


export const AuthContext = createContext();

export const AuthProvider = ({isLoggedIn: isLoggedInProp, skinColor: skinColorProp, gender: genderProp, nickname: nicknameProp, myLocation: myLocationProp, children}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(isLoggedInProp);
  const [skinColor, setSkinColor] = useState(skinColorProp);
  const [gender, setGender] = useState(genderProp);
  const [nickname, setNickname] = useState(nicknameProp);
  const [myLocation, setMyLocation] = useState(myLocationProp);

  const logUserIn = async (skinColor, gender, nickname, myLocation) => {
    try {
      setIsLoggedIn(true);
      await AsyncStorage.setItem("isLoggedIn", "true")
      setSkinColor(skinColor)
      await AsyncStorage.setItem("skinColor", skinColor.toString())
      setGender(gender)
      await AsyncStorage.setItem("gender", gender.toString())
      setNickname(nickname)
      await AsyncStorage.setItem("nickname", nickname)
      setMyLocation(myLocation)
      await AsyncStorage.setItem("myLocation", myLocation)
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <AuthContext.Provider value={{isLoggedIn, skinColor, gender, nickname, myLocation, logUserIn}}>
      {children}
    </AuthContext.Provider>
  )

}
