import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import WeatherContainer from "../../../../screen/weather/WeatherContainer"
import WeatherDetailContainer from "../../../../screen/weather/detail/WeatherDetailContainer"

const { Navigator, Screen } = createStackNavigator()

const WeatherStackNavigation = () => {
    return (
        <Navigator screenOptions={{ headerShown: false }}>
            <Screen name={"WeatherContainer"} component={WeatherContainer} />
            <Screen name={"WeatherDetailContainer"} component={WeatherDetailContainer} />
        </Navigator>
    )
}

export default WeatherStackNavigation
