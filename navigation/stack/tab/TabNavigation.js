import React from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { CommonColor, CommonFont } from "../../../text/CommonStyle"
import LocationStackNavigation from "./location/LocationStackNavigation"
import WeatherStackNavigation from "./weather/WeatherStackNavigation"
import CodyStackNavigation from "./cody/CodyStackNavigation"
import LocationOn from "../../../asset/icon/location_on.svg"
import LocationOff from "../../../asset/icon/location_off.svg"
import WeatherOn from "../../../asset/icon/weather_on.svg"
import WeatherOff from "../../../asset/icon/weather_off.svg"
import CodyOn from "../../../asset/icon/cody_on.svg"
import CodyOff from "../../../asset/icon/cody_off.svg"

const { Navigator, Screen } = createBottomTabNavigator()

const TabNavigator = () => {
    return (
        <Navigator
            initialRouteName={"WeatherStackNavigation"}
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: CommonColor.basic_gray_dark,
                tabBarInactiveTintColor: CommonColor.basic_gray_medium,
                tabBarLabelStyle: { fontFamily: "Pretendard-Regular", fontSize: 12 }
            }}
        >
            <Screen
                name={"LocationStackNavigation"}
                component={LocationStackNavigation}
                options={{
                    tabBarLabel: "위치",
                    tabBarIcon: ({ focused }) => {
                        return focused ? <LocationOn /> : <LocationOff />
                    }
                }}
            />
            <Screen
                name={"WeatherStackNavigation"}
                component={WeatherStackNavigation}
                options={{
                    tabBarLabel: "날씨",
                    tabBarIcon: ({ focused }) => {
                        return focused ? <WeatherOn /> : <WeatherOff />
                    }
                }}
            />
            <Screen
                name={"CodyStackNavigation"}
                component={CodyStackNavigation}
                options={{
                    tabBarLabel: "코디",
                    tabBarIcon: ({ focused }) => {
                        return focused ? <CodyOn /> : <CodyOff />
                    }
                }}
            />
        </Navigator>
    )
}

export default TabNavigator
