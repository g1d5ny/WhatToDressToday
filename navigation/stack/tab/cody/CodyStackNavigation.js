import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import CodySetting from "../../../../screen/cody/CodySetting";


const {Navigator, Screen} = createStackNavigator();

const CodyStackNavigation = () => {
  return (
    <Navigator screenOptions={{headerShown: false}}>
      <Screen name={'CodySetting'} component={CodySetting}/>
    </Navigator>
  )
}

export default CodyStackNavigation;
