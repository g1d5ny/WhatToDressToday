/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React  from "react";
import type {Node} from 'react';
import { Platform, StatusBar, useColorScheme, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { navigationRef } from "./navigation/RootNavigation";
import NavController from "./navigation/NavController";

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const DarkMode = () => {
    if (Platform.OS === 'ios') {
      if (isDarkMode)
        return 'dark-content'
      else
        return 'default'
    } else {
      return 'default'
    }
  }

  return (
    <View style={{flex: 1, backgroundColor: "#fff"}}>
      <StatusBar barStyle={DarkMode()}/>
      <NavigationContainer ref={navigationRef}>
        <NavController/>
      </NavigationContainer>
    </View>
  );
};

export default App;
