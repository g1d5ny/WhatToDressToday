import React, { useContext } from "react";
import WeatherPresenter from "./WeatherPresenter";
import { AuthContext } from "../../context/AuthContext";

 /**
* @dates 2022-08-14
* @author jw
* @description
*/
const WeatherContainer = ({ navigation }) => {
    const {skinColor, gender, nickname, myLocation, myLocations, date} = useContext(AuthContext);

    return (
        <WeatherPresenter navigation={navigation} skinColor={skinColor} gender={gender} nickname={nickname} myLocation={myLocation} myLocations={myLocations} date={date}/>
    )
}
export default WeatherContainer;
