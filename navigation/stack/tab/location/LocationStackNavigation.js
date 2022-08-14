import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LocationChangeScreen from "../../../../screen/location/LocationChangeScreen";

const {Navigator, Screen} = createStackNavigator();

const LocationStackNavigation = () => {
  return (
    <Navigator screenOptions={{headerShown: false}}>
      <Screen name={'LocationChangeScreen'} component={LocationChangeScreen} />
    </Navigator>
  )
}

export default LocationStackNavigation;
