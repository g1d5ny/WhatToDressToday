import React from "react"
import { View } from "react-native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { CommonColor } from "../../../text/CommonStyle"
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
                tabBarStyle: { paddingTop: 13 },
                tabBarLabelStyle: { fontFamily: "Pretendard-Regular", fontSize: 12, marginTop: 5 }
            }}
        >
            <Screen
                name={"LocationStackNavigation"}
                component={LocationStackNavigation}
                options={{
                    tabBarLabel: "위치",
                    tabBarIcon: ({ focused }) => {
                        return focused ? (
                            <View style={{ marginBottom: 5 }}>
                                <LocationOn width={24} height={24} />
                            </View>
                        ) : (
                            <View style={{ marginBottom: 5 }}>
                                <LocationOff width={24} height={24} />
                            </View>
                        )
                    }
                }}
            />
            <Screen
                name={"WeatherStackNavigation"}
                component={WeatherStackNavigation}
                options={{
                    tabBarLabel: "날씨",
                    tabBarIcon: ({ focused }) => {
                        return focused ? (
                            <View style={{ marginBottom: 5 }}>
                                <WeatherOn width={24} height={24} />
                            </View>
                        ) : (
                            <View style={{ marginBottom: 5 }}>
                                <WeatherOff width={24} height={24} />
                            </View>
                        )
                    }
                }}
            />
            <Screen
                name={"CodyStackNavigation"}
                component={CodyStackNavigation}
                options={{
                    tabBarLabel: "코디",
                    tabBarIcon: ({ focused }) => {
                        return focused ? (
                            <View style={{ marginBottom: 5 }}>
                                <CodyOn width={24} height={24} />
                            </View>
                        ) : (
                            <View style={{ marginBottom: 5 }}>
                                <CodyOff width={24} height={24} />
                            </View>
                        )
                    }
                }}
            />
        </Navigator>
    )
}

export default TabNavigator
