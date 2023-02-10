import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import CodySetting from "../../../../screen/cody";
import ProfileChangeScreen from "../../../../screen/cody/CodySetting/ProfileEditScreen"
import CharacterChangeScreen from "../../../../screen/cody/CodySetting/CharacterChangeScreen"
import CodyRegisterScreen from "../../../../screen/cody/CodySetting/CodyRegisterScreen"
import CodyRecordScreen from "../../../../screen/cody/CodySetting/CodyRecordScreen"
import NotificationSettingScreen from "../../../../screen/cody/Notification/NotificationSettingScreen"
import AppInfo from "../../../../screen/cody/AppInfo"




const {Navigator, Screen} = createStackNavigator();

const CodyStackNavigation = () => {
  return (
    <Navigator screenOptions={{headerShown: false}}>
      <Screen name={'CodySetting'} component={CodySetting}/>
      <Screen name={'ProfileChangeScreen'} component={ProfileChangeScreen}/>
      <Screen name={'CharacterChangeScreen'} component={CharacterChangeScreen}/>
      <Screen name={'CodyRegisterScreen'} component={CodyRegisterScreen}/>
      <Screen name={'CodyRecordScreen'} component={CodyRecordScreen}/>
      <Screen name={'NotificationSettingScreen'} component={NotificationSettingScreen}/>
      <Screen name={'AppInfo'} component={AppInfo}/>
    </Navigator>
  )
}

export default CodyStackNavigation;
