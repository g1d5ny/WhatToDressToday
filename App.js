/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from "react";
import type { Node } from "react";
import { Platform, SafeAreaView, StatusBar, useColorScheme, View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { navigationRef } from "./navigation/RootNavigation";
import NavController from "./navigation/NavController";
import Toast from "react-native-toast-message";
import { CommonColor, CommonFont } from "./text/CommonStyle";
import Check from "./asset/icon/check_blue_filled.svg";
import Splash from "./component/lottieComponent/Splash";
import { AuthProvider } from "./context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loader from "./component/lottieComponent/Loader";

const App: () => Node = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [skinColor, setSkinColor] = useState(1); // 1 : 왼쪽, 2 : 가운데, 3 : 오른쪽
  const [gender, setGender] = useState(1);  // 1 : 남자, 2 : 여자
  const [nickname, setNickname] = useState("");
  const [myLocation, setMyLocation] = useState("");
  const [myLocations, setMyLocations] = useState([]);
  const [date, setDate] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // AsyncStorage.clear()
    GetUserInfo()
  }, [])

  const GetUserInfo = async () => {
    const isLoggedIn = await AsyncStorage.getItem("isLoggedIn")
    setIsLoggedIn(isLoggedIn)

    if (isLoggedIn) {
      setLoading(true)
      const skinColor = await AsyncStorage.getItem("skinColor")
      setSkinColor(skinColor)

      const gender = await AsyncStorage.getItem("gender")
      setGender(gender)

      const nickname = await AsyncStorage.getItem("nickname")
      setNickname(nickname)

      const myLocation = await AsyncStorage.getItem("myLocation")
      setMyLocation(myLocation)

      const myLocations = await AsyncStorage.getItem("myLocations")
      if (myLocations !== null) {
        setMyLocations(JSON.parse(myLocations))
      } else {
        setMyLocations([])
      }

      const date = await AsyncStorage.getItem("date")
      if (date !== null) {
        setDate(JSON.parse(date))
      } else {
        setDate([])
      }
      setLoading(false)
    }
    else {
      setLoading(false)
    }
  }


  const toastConfig = {
    my_custom_type: ({ text1 }) => (
      <View style={{
        maxWidth: 300,
        height: 45,
        backgroundColor: CommonColor.main_blue,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        borderRadius: 10,
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      }}>
        <View style={{
          width: "100%",
          height: 43,
          backgroundColor: CommonColor.main_white,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
          borderRadius: 10,
          paddingLeft: 10, paddingRight: 10,
          paddingTop: 13, paddingBottom: 13,
        }}>
          <Check />
          <Text style={[CommonFont.regular_14, { marginLeft: 8, color: CommonColor.main_blue }]}>{text1}</Text>
        </View>
      </View>
    ),
  };

  const isDarkMode = useColorScheme() === "dark";

  const DarkMode = () => {
    if (Platform.OS === "ios") {
      if (isDarkMode)
        return "dark-content";
      else
        return "default";
    } else {
      return "default";
    }
  };

  if (loading) {
    return <Loader/>
  }

  return (
    <>
      <Splash />
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar barStyle={DarkMode()} />
        <AuthProvider isLoggedIn={isLoggedIn} skinColor={skinColor} gender={gender} nickname={nickname} myLocation={myLocation} myLocations={myLocations} date={date}>
          <NavigationContainer ref={navigationRef}>
            <NavController />
            <Toast config={toastConfig} visibilityTime={2500} />
          </NavigationContainer>
        </AuthProvider>
      </SafeAreaView>
    </>
  );
};

export default App;
