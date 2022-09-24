import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import OnBoarding1Screen from "../../screen/onboarding/OnBoarding1Screen";
import TabNavigation from "./tab/TabNavigation";
import OnBoarding2Screen from "../../screen/onboarding/OnBoarding2Screen";
import ProfileEditScreen from "../../screen/cody/CodySetting/ProfileEditScreen";
import CodyRecordScreen from "../../screen/cody/CodySetting/CodyRecordScreen";
import CodyRegisterScreen from "../../screen/cody/CodySetting/CodyRegisterScreen";
import CharacterChangeScreen from "../../screen/cody/CodySetting/CharacterChangeScreen";
import NotificationSettingScreen from "../../screen/cody/CodySetting/NotificationSettingScreen";
import AppInfoScreen from "../../screen/cody/AppInfo";
import ServiceScreen from "../../screen/cody/AppInfo/ServiceScreen";
import PrivacyPolicyScreen from "../../screen/cody/AppInfo/PrivacyPolicyScreen";
import LocationServiceScreen from "../../screen/cody/AppInfo/LocationServiceScreen";
import OpenSourceLicenseScreen from "../../screen/cody/AppInfo/OpenSourceLicenseScreen";
import WeatherDetailContainer from "../../screen/weather/detail/WeatherDetailContainer";


const {Navigator, Screen} = createStackNavigator();

const StackNavigation = () => {
  return (
    <Navigator screenOptions={{headerShown: false}}>
      <Screen name={'OnBoarding1Screen'} component={OnBoarding1Screen} />
      <Screen name={'OnBoarding2Screen'} component={OnBoarding2Screen} />
      <Screen name={'ProfileEditScreen'} component={ProfileEditScreen} />
      <Screen name={'TabNavigation'} component={TabNavigation} />
      <Screen name={'CodyRecordScreen'} component={CodyRecordScreen} />
      <Screen name={'CodyRegisterScreen'} component={CodyRegisterScreen} />
      <Screen name={'CharacterChangeScreen'} component={CharacterChangeScreen} />
      <Screen name={'NotificationSettingScreen'} component={NotificationSettingScreen} />
      <Screen name={'AppInfoScreen'} component={AppInfoScreen} />
      <Screen name={'ServiceScreen'} component={ServiceScreen} />
      <Screen name={'PrivacyPolicyScreen'} component={PrivacyPolicyScreen} />
      <Screen name={'LocationServiceScreen'} component={LocationServiceScreen} />
      <Screen name={'OpenSourceLicenseScreen'} component={OpenSourceLicenseScreen} />
      <Screen name={'WeatherDetailContainer'} component={WeatherDetailContainer} />
    </Navigator>
  )
}

export default StackNavigation;
