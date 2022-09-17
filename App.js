/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from "react";
import type { Node } from "react";
import { Platform, SafeAreaView, StatusBar, useColorScheme, View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { navigationRef } from "./navigation/RootNavigation";
import NavController from "./navigation/NavController";
import Toast from "react-native-toast-message";
import { CommonColor, CommonFont } from "./text/CommonStyle";
import Check from "./asset/icon/check_blue_filled.svg";
import Splash from "./screen/Splash";

const App: () => Node = () => {

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

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <Splash />
      <StatusBar barStyle={DarkMode()} />
      <NavigationContainer ref={navigationRef}>
        <NavController />
        <Toast config={toastConfig} visibilityTime={2500} />
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default App;
