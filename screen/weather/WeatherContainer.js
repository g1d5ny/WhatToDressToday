import React from "react";
import WeatherPresenter from "./WeatherPresenter";

 /**
* @dates 2022-08-14
* @author jw
* @description
*/
const WeatherContainer = ({ navigation }) => {
    return (
        <WeatherPresenter navigation={navigation} />
    )
}
export default WeatherContainer;
