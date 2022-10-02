import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import OnBoardingScreen1 from "../../screen/onboarding/OnBoardingScreen1";
import OnBoardingScreen3_1 from "../../screen/onboarding/OnBoardingScreen3_1";
import OnBoardingScreen4_1 from "../../screen/onboarding/OnBoardingScreen4_1";

const {Navigator, Screen} = createStackNavigator();

const StackNavigation = () => {
  return (
    <Navigator screenOptions={{headerShown: false}}>
      <Screen name={'OnBoardingScreen1'} component={OnBoardingScreen1} />
      <Screen name={'OnBoardingScreen3_1'} component={OnBoardingScreen3_1} />
      <Screen name={'OnBoardingScreen4_1'} component={OnBoardingScreen4_1} />
    </Navigator>
  )
}

export default StackNavigation;
