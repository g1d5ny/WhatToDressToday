import React, {createContext, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext();

export const AuthProvider = ({isLoggedIn: isLoggedInProp, skinColor: skinColorProp, gender: genderProp, nickname: nicknameProp, myLocation: myLocationProp, myLocations: myLocationsProp, date: dateProp, children}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(isLoggedInProp);
  const [skinColor, setSkinColor] = useState(skinColorProp);
  const [gender, setGender] = useState(genderProp);
  const [nickname, setNickname] = useState(nicknameProp);
  const [myLocation, setMyLocation] = useState(myLocationProp);
  const [myLocations, setMyLocations] = useState(myLocationsProp);
  const [date, setDate] = useState(dateProp);

  const logUserIn = async (skinColor, gender, nickname, myLocation, myLocations, date) => {
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

      await SetMyLocations(myLocations)

      await SetDate(date)

    } catch (e) {
      console.error(e)
    }
  }

  const SetMyLocations = async (value) => {
    const list = [...myLocations, value]
    setMyLocations(list);
    await AsyncStorage.setItem("myLocations", JSON.stringify(list));
  }

  const SetDate = async (value) => {
    const list = [...date, value]
    setDate(list);
    await AsyncStorage.setItem("date", JSON.stringify(list));
  }

  const DeleteMyLocation = async (index) => {
    let list = [...myLocations];
    list.splice(index, 1);
    setMyLocations(list);
    await AsyncStorage.setItem("setMyLocations", JSON.stringify(list));

    let dateList = [...date];
    dateList.splice(index, 1);
    setDate(dateList);
    await AsyncStorage.setItem("date", JSON.stringify(dateList));
  }

  return (
    <AuthContext.Provider value={{isLoggedIn, skinColor, gender, nickname, myLocation, myLocations, date, logUserIn, SetMyLocations, SetDate, DeleteMyLocation}}>
      {children}
    </AuthContext.Provider>
  )

}
